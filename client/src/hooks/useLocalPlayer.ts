import { useEffect, useRef } from "react";
import { useLocalStorage } from "react-use";
import { LocalPlayerData } from "../types/localStorage.types";
import { generateUUID } from "../utils/data-utils";

interface LocalPlayer {
  data: LocalPlayerData;
  assign(newData: Partial<LocalPlayerData>): LocalPlayerData;
}

export default function useLocalPlayer(): LocalPlayer {
  const uuid = useRef(generateUUID());
  const [value, setValue] = useLocalStorage<LocalPlayerData>("player");

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
      const newOverallData: LocalPlayerData = {
        ...data,
        ...newPartialData,
      };
      setValue(newOverallData);
      return newOverallData;
    },
  };
}
