import { Redirect, useParams } from "react-router-dom";
import useGame from "../hooks/useGame";
import useSocketPlayer from "../hooks/useSocketPlayer";
import { GameStatus } from "../types/game.types";
import IntroFrame from "../ui/molecules/IntroFrame";
import GameIdView from "../views/GameIdView";
import { PATHS } from "./paths";

export default function GameIdRoute(): JSX.Element {
  const { id: gameId } = useParams<{ id: string }>();
  const game = useGame(gameId);
  const player = useSocketPlayer();

  if (game.loading) {
    return (
      <IntroFrame>
        <p>Loading...</p>
      </IntroFrame>
    );
  }

  if (!game.data) {
    return <Redirect to={PATHS.index} />;
  }

  if (!game.data.players[player.data.id]) {
    const redirect =
      game.data.status === GameStatus.LOBBY
        ? PATHS.lobbyForGameId(game.data.id)
        : PATHS.index;

    return <Redirect to={redirect} />;
  }

  return (
    <GameIdView game={game.data} />
  );
}
