import { useSocket } from "../socket";
import { ClientSocket } from "../types/event.types";
import { LocalPlayerData } from "../types/game.types";
import useLocalPlayer from "./useLocalPlayer";

interface SocketPlayerData extends LocalPlayerData {
  socketId: string;
}

interface SocketPlayer {
  data: SocketPlayerData;
  assign(newData: Partial<LocalPlayerData>): SocketPlayerData;
  socket: ClientSocket;
}

export default function useSocketPlayer(): SocketPlayer {
  const localPlayer = useLocalPlayer();
  const socket = useSocket();

  return {
    data: { ...localPlayer.data, socketId: socket.id },
    assign: (newData) => ({
      ...localPlayer.assign(newData),
      socketId: socket.id,
    }),
    socket,
  };
}
