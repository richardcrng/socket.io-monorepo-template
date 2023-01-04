import IntroFrame from "../ui/molecules/IntroFrame";

interface Props {
  gameId: string;
}

export default function LoadingGameIdView({ gameId }: Props): JSX.Element {
  return (
    <IntroFrame className="flex flex-col justify-between items-center text-center">
      <h1 className="text-3xl">Searching for game {gameId}...</h1>
      <p>This may take a moment - thank you for your patience</p>
    </IntroFrame>
  );
}