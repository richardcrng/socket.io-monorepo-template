import { useHistory } from "react-router";
import { useSocket } from "../socket";
import useSocketListener from "../hooks/useSocketListener";
import useLocalPlayerData from "../hooks/useLocalPlayer";
import { generateRandomGameId } from "../utils/data-utils";
import SetNameToJoinGameView from "../views/SetNameToJoinGameView";
import { PATHS } from "./paths";

function HostNewRoute(): JSX.Element {
  const socket = useSocket();
  const history = useHistory();

  const { data, assign } = useLocalPlayerData();

  useSocketListener("HOST_GAME_CREATED", (game, hostId) => {
    if (hostId === data.id) {
      history.push(PATHS.lobbyForGameId(game.id));
    }
  });

  const handleSetName = (newName: string) => {
    const newGameId = generateRandomGameId();

    assign({ name: newName, gameId: newGameId });

    socket.emit("CREATE_HOST_GAME", {
      ...data,
      gameId: newGameId,
      name: newName,
      socketId: socket.id,
      isHost: true,
    });
  };

  return (
    <SetNameToJoinGameView
      initialNameValue={data.name}
      mode="host"
      onSetName={handleSetName}
    />
  );
}

export default HostNewRoute;
