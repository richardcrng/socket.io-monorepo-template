import { useCopyToClipboard } from "react-use";
import styled from "styled-components";
import { Game, Player } from "../types/game.types";
import { LobbyHandlers } from "../types/handler.types";
import PlayerList from "../ui/atoms/PlayerList";
import classNames from "classnames";

interface Props extends LobbyHandlers {
  game: Game;
  player: Player;
  players: Player[];
}

function LobbyIdView({
  game,
  onGameStart,
  onPlayerKick,
  player,
  players,
}: Props): JSX.Element {
  // eslint-disable-next-line
  const [_, copyToClipboard] = useCopyToClipboard();

  const isAtMinimumPlayerCount = players.length >= 3;

  return (
    <Container>
      <Header>
        <h1 className="text-3xl text-center font-bold">Game id: {game.id}</h1>
        <StyledA
          onClick={(e) => {
            e.preventDefault();
            copyToClipboard(window.location.href);
            window.alert(`Copied to clipboard: ${window.location.href}`);
          }}
          href="#"
        >
          Copy game join link
        </StyledA>
        {!isAtMinimumPlayerCount && (
          <div className={classNames("alert", "alert-info", "w-full")}>
            At least three players are needed to start the game
          </div>
        )}
      </Header>
      <StyledPlayerList
        players={Object.values(game.players)}
        ownPlayerId={player.id}
        renderPlayer={(playerToRender, idx, ownPlayerId) => {
          return (
            <PlayerListItemContents>
              <p style={{ marginLeft: "10px" }}>
                <span className="font-medium">{playerToRender.name}</span>
                <span className="font-light">
                  {playerToRender.id === ownPlayerId && " (you)"}
                  {playerToRender.isHost && " (host)"}
                </span>
              </p>
              {player.isHost && playerToRender.id !== player.id && (
                <button
                  className="btn btn-square btn-xs"
                  onClick={() => onPlayerKick(playerToRender.id)}
                >
                  X
                </button>
              )}
            </PlayerListItemContents>
          );
        }}
      />
      <ActionArea>
        {player.isHost && (
          <button
            className="btn btn-block"
            disabled={!isAtMinimumPlayerCount}
            onClick={onGameStart}
          >
            Start game
          </button>
        )}
      </ActionArea>
    </Container>
  );
}

const Container = styled.div.attrs({
  className: "h-full w-full gap-y-4 grid",
})`
  grid-template-columns: auto;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header"
    "players"
    "actions";
`;

const Header = styled.div.attrs({
  className: "flex flex-col gap-2",
})`
  grid-area: header;
  width: 100%;
`;

const StyledPlayerList = styled(PlayerList).attrs({
  className: "list-decimal",
})`
  grid-area: players;
  overflow-y: scroll;
  padding-inline-start: 20px;
`;

const ActionArea = styled.div`
  grid-area: actions;
  width: 100%;
`;

const StyledA = styled.a.attrs({
  className: "block text-center underline text-sky-400",
})``;

const PlayerListItemContents = styled.div`
  display: flex;
  align-items: center;
  align-content: center;
  font-size: 1.2rem;
  justify-content: space-between;
  padding-bottom: 10px;

  p {
    margin: 0;
  }

  button {
    font-size: 0.9rem;
    margin: 0;
  }
`;

export default LobbyIdView;
