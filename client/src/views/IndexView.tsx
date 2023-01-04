import IntroFrame from "../ui/molecules/IntroFrame";
import { generateRandomGameId } from "../utils/data-utils";

interface Props {
  onHostNew(): void;
  onNavigateToJoinGame(gameId: string): void;
  onNavigateToHostGame(): void;
}

export default function IndexView({ onHostNew, onNavigateToHostGame, onNavigateToJoinGame }: Props): JSX.Element {

  const handleTryJoinGame = () => {
    const gameId = window.prompt(`Please enter the 5 character game ID provided by your host, e.g. ${generateRandomGameId()}`);

    if (!gameId) {
      const result = window.confirm("It looks like you didn't provide a game ID - do you want to try hosting a new game?");
      result && onNavigateToHostGame()
    } else {
      onNavigateToJoinGame(gameId.toUpperCase())
    }
  }
  
  return (
    <IntroFrame className="flex flex-col justify-between items-center text-center">
      <p className="text-xl">{"[[ADD GAME DESCRIPTION]]"}</p>
      <div className="w-full flex flex-col gap-y-2">
        <button
          className="btn btn-primary btn-block btn-xl"
          onClick={handleTryJoinGame}
        >
          Join game
        </button>
        <button
          className="btn btn-secondary btn-block btn-xl"
          onClick={onHostNew}
        >
          Host new
        </button>
      </div>
    </IntroFrame>
  );
}
