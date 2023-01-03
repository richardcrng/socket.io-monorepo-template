export interface LobbyHandlers {
  onGameStart(): void;
  onPlayerKick(playerId: string): void;
}
