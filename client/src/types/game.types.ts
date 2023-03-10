import { Player } from "./player.types";

export interface GameStateCore {
  id: string;
  players: {
    [playerId: string]: Player;
  };
  status: GameStatus;
  settings: GameSettings;
}

export type Game = GameStateCore;

export enum GameStatus {
  LOBBY = "LOBBY",
  ONGOING = "ONGOING",
}

export interface GameSettings {}