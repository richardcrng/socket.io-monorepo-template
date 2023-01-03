import { Socket as TClientSocket } from "socket.io-client";
import { Socket as TServerSocket, Server as TServer } from "socket.io";
import { Game, Player } from "./game.types";

export type ClientSocket = TClientSocket<
  ServerEventListeners,
  ClientEventListeners
>;

export type ServerSocket = TServerSocket<
  ClientEventListeners,
  ServerEventListeners
>;

export type ServerIO = TServer<ClientEventListeners, ServerEventListeners>;

/**
 * Listeners for `ClientEvent`s
 */
export type ClientEventListeners = {
  CREATE_HOST_GAME: (player: Player) => void;
  GET_GAME: (gameId: string) => void;
  JOIN_GAME: (gameId: string, player: Omit<Player, "gameId">) => void;
  KICK_PLAYER: (gameId: string, playerId: string) => void;
  START_GAME: (gameId: string) => void;
};

export type ClientEvent = keyof ClientEventListeners;

/**
 * Listeners for `ServerEvent`s
 */
export type ServerEventListeners = {
  GAME_NOT_FOUND: (gameId: string) => void;
  GAME_UPDATED: (game: Game) => void;
  HOST_GAME_CREATED: (game: Game, hostId: string) => void;
  PLAYER_KICKED: (gameId: string, playerId: string) => void;
};

export type ServerEvent = keyof ServerEventListeners;
