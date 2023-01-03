/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect } from "react";
import { useSocket } from "../socket";
import { ServerEvent, ServerEventListeners } from "../types/event.types";

export default function useSocketListener<
  ListenEvent extends ServerEvent = ServerEvent
>(event: ListenEvent, listener: ServerEventListeners[ListenEvent]): void {
  const socket = useSocket();

  useEffect(() => {
    // @ts-ignore - okay, bad library typing
    socket.on(event, listener);

    return function cleanup() {
      // @ts-ignore - okay, bad library typing
      socket.off(event, listener);
    };
  });
}
