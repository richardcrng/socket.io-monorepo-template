import { isEqual } from "lodash";
import { useEffect, useRef } from "react";
import { useLocalStorage } from "react-use";
import packageJson from "../../package.json";
import { LocalPlayerData } from "../types/player.types";
import { generateUUID } from "../utils/data-utils";

interface LocalPlayer {
  data: LocalPlayerData;
  assign<P extends Partial<LocalPlayerData>>(newData: P): LocalPlayerData & P;
}

export default function useLocalPlayer(): LocalPlayer {
  const uuid = useRef(generateUUID());
  // use package.json name so it's cleaner in dev mode on
  //  localhost:3000 for new games based on template
  //  (all will have different keys in local storage)
  const [value, setValue] = useLocalStorage<LocalPlayerData>(
    `player-${packageJson.name}`
  );

  useEffect(() => {
    if (!value) {
      setValue({
        id: uuid.current,
        name: "",
      });
    }
  });

  const data: LocalPlayerData = value ?? {
    id: uuid.current,
    name: "",
  };

  return {
    data,
    assign: (newPartialData) => {
      const newOverallData = {
        ...data,
        ...newPartialData,
      };
      if (!isEqual(data, newOverallData)) {
        setValue(newOverallData);
      }
      return newOverallData;
    },
  };
}
