import { Game } from "../types/game.types";
import IntroFrame from "../ui/molecules/IntroFrame";

interface Props {
  game: Game;
}

export default function GameIdView({ game }: Props): JSX.Element {
  return (
    <IntroFrame>
      <p>Game has started!</p>
      <pre>{JSON.stringify(game, null, 2)}</pre>
    </IntroFrame>
  );
}
