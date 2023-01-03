import { Redirect, useParams } from "react-router-dom";
import LobbyIdView from "../views/LobbyIdView";
import useGame from "../hooks/useGame";
import SetNameToJoinGameView from "../views/SetNameToJoinGameView";
import useSocketPlayer from "../hooks/useSocketPlayer";
import useSocketListener from "../hooks/useSocketListener";
import { useHistory } from "react-router";
import { GameStatus } from "../types/game.types";
import { PATHS } from "./paths";

function LobbyIdRoute(): JSX.Element {
  const { id: gameId } = useParams<{ id: string }>();
  const player = useSocketPlayer();
  const history = useHistory();

  useSocketListener("PLAYER_KICKED", (removingGameId, removedPlayerId) => {
    if (gameId === removingGameId && player.data.id === removedPlayerId) {
      history.push("/");
      window.alert("You have been kicked from the game!");
    }
  });

  const game = useGame(gameId);

  if (game.loading) {
    return <p>loading...</p>;
  }

  if (!game.data) {
    // no game exists so redirect
    return <Redirect to="/" />;
  }

  if (game.data.status === GameStatus.ONGOING) {
    // game is not in lobby
    return <Redirect to={PATHS.gameForId(game.data.id)} />;
  }

  if (!game.data.players[player.data.id]) {
    const gameId = game.data.id;

    // player is not in game, so needs to join
    return (
      <SetNameToJoinGameView
        initialNameValue={player.data.name}
        mode="join"
        onSetName={(name) => {
          const playerData = player.assign({ name, gameId });
          player.socket.emit("JOIN_GAME", gameId, playerData);
        }}
      />
    );
  }

  return (
    <LobbyIdView
      game={game.data}
      player={game.data.players[player.data.id]!}
      players={Object.values(game.data.players)}
      onGameStart={() => {
        player.socket.emit("START_GAME", gameId);
      }}
      onPlayerKick={(playerId) => {
        player.socket.emit("KICK_PLAYER", gameId, playerId);
      }}
    />
  );
}

export default LobbyIdRoute;
