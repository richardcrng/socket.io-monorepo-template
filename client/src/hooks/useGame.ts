import { useEffect } from "react";
import { bundle, useRiducer } from "riduce";
import { useSocket } from "../socket";
import { Game } from "../types/game.types";
import useSocketListener from "./useSocketListener";

interface UseGameResult {
  data: Game | undefined;
  loading: boolean;
  error: string | undefined;
}

const initialState: UseGameResult = {
  loading: true,
  data: undefined,
  error: undefined,
};

export default function useGame(gameId: Game["id"]): UseGameResult {
  const socket = useSocket();
  const { state, dispatch, actions } = useRiducer(initialState);

  const setGame = (game: Game) => {
    dispatch(
      bundle([actions.data.create.update(game), actions.loading.create.off()])
    );
  };

  useEffect(() => {
    socket.emit("GET_GAME", gameId);
  }, [socket, gameId]);

  useSocketListener("GAME_UPDATED", (game) => {
    game.id === gameId && setGame(game);
  });

  useSocketListener("GAME_NOT_FOUND", (unlocatedGameId) => {
    if (!(gameId === unlocatedGameId)) return;
    dispatch(
      bundle([
        actions.error.create.update("Game not found"),
        actions.loading.create.off(),
      ])
    );
  });

  return state;
}
