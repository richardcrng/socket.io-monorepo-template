import { useHistory } from "react-router-dom";
import IndexView from "../views/IndexView";
import { PATHS } from "./paths";

export default function IndexRoute(): JSX.Element {
  const history = useHistory();

  return (
    <IndexView
      onHostNew={() => history.push(PATHS.hostNew)}
      onNavigateToJoinGame={(gameId) => history.push(PATHS.lobbyForGameId(gameId))}
      onNavigateToHostGame={() => history.push(PATHS.hostNew)}
    />
  );
}