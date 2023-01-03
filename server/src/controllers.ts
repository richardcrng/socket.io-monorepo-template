import { ClientEventListeners } from "../../client/src/types/event.types";
import { GameManager } from "./game/manager";

export const createHostGame: ClientEventListeners["CREATE_HOST_GAME"] = (
  hostPlayer
) => {
  GameManager.for(hostPlayer.gameId).createGameWithHost(hostPlayer);
};

export const getGame: ClientEventListeners["GET_GAME"] = (gameId) => {
  const gameManager = GameManager.for(gameId);
  if (gameManager.isRetrievable()) {
    gameManager._broadcast();
  } else {
    gameManager.io.emit("GAME_NOT_FOUND", gameId);
  }
};

export const joinGame: ClientEventListeners["JOIN_GAME"] = (gameId, player) => {
  GameManager.for(gameId).addPlayer(player);
};

export const kickPlayer: ClientEventListeners["KICK_PLAYER"] = (
  gameId,
  playerId
) => {
  GameManager.for(gameId).removePlayer(playerId);
};

export const startGame: ClientEventListeners["START_GAME"] = (gameId) => {
  GameManager.for(gameId).start();
};
