export const PATHS = {
  hostNew: "/host/new" as const,
  index: "/" as const,
  gameId: "/game/:id" as const,
  gameForId: (gameId: string) => `/game/${gameId}` as const,
  lobbyId: "/lobby/:id" as const,
  lobbyForGameId: (gameId: string) => `/lobby/${gameId}` as const,
};
