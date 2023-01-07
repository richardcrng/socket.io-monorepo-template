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
