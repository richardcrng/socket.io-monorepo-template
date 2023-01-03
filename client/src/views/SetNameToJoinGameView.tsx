import PlayerNamer from "../ui/atoms/PlayerNamer";
import IntroFrame from "../ui/molecules/IntroFrame";

interface Props {
  initialNameValue?: string;
  mode: "host" | "join";
  onSetName(name: string): void;
  takenNames?: string[];
}

export default function SetNameToJoinGameView({
  initialNameValue,
  mode,
  onSetName,
  takenNames = [],
}: Props): JSX.Element {
  return (
    <IntroFrame>
      <p className="text-2xl">
        To {mode === "host" ? "host a new" : "join the"} game, please choose a
        player name first:
      </p>
      <div className="w-full flex flex-col gap-y-2">
        <PlayerNamer
          {...{ onSetName, takenNames }}
          initialValue={initialNameValue}
        />
      </div>
    </IntroFrame>
  );
}
