export interface GameStateCore {
  id: string;
  players: {
    [playerId: string]: Player;
  };
  status: GameStatus;
}

export type Game = GameStateCore;

export enum GameStatus {
  LOBBY = "LOBBY",
  ONGOING = "ONGOING",
}

export interface LocalPlayerData {
  id: string;
  name: string;
  gameId?: string;
}

export interface Player extends LocalPlayerData {
  socketId: string;
  gameId: string;
  isHost?: boolean;
}
