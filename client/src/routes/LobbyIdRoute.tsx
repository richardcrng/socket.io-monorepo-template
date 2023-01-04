import { Redirect, useParams } from "react-router-dom";
import LobbyIdView from "../views/LobbyIdView";
import useGame from "../hooks/useGame";
import SetNameToJoinGameView from "../views/SetNameToJoinGameView";
import useSocketPlayer from "../hooks/useSocketPlayer";
import useSocketListener from "../hooks/useSocketListener";
import { useHistory } from "react-router";
import { GameStatus } from "../types/game.types";
import { PATHS } from "./paths";
import { useEffect } from 'react';
import LoadingGameIdView from "../views/LoadingGameIdView";

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

  useEffect(() => {
    if (!game.loading && !game.data) {
      // stick in useEffect to avoid repeat messages
      window.alert(`No game exists with ID ${gameId}`);
      history.push(PATHS.index)
    }
  }, [gameId, game.loading, game.data, history]);

  if (game.loading) {
    return <LoadingGameIdView {...{ gameId }} />;
  }

  if (!game.data) {
    return <LoadingGameIdView {...{ gameId }} />;
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
