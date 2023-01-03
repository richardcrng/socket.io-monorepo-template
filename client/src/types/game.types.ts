import { LocalPlayerData } from "./localStorage.types";

export interface GameStateCore {
  id: string;
  players: {
    [playerSocketId: string]: Player;
  };
  status: GameStatus;
}

export type Game = GameStateCore;

export enum GameStatus {
  LOBBY = "LOBBY",
  ONGOING = "ONGOING",
}

export interface Player extends LocalPlayerData {
  socketId: string;
  gameId: string;
  isHost?: boolean;
}
