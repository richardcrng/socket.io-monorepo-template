import { Game, Player } from "../types/game.types";


export const getGameHost = (game: Game): Player & { isHost: true } => {
  const players = Object.values(game.players);
  const host = players.find((p): p is Player & { isHost: true } => !!p.isHost);
  if (!host) {
    throw new Error("Game does not appear to have a host")
  }
  return host
}