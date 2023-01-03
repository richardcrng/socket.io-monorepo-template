import IntroFrame from "../ui/molecules/IntroFrame";

interface Props {
  onHostNew(): void;
}

export default function IndexView({ onHostNew }: Props): JSX.Element {
  return (
    <IntroFrame>
      <p className="text-xl">{"[[ADD GAME DESCRIPTION]]"}</p>
      <button className="btn btn-block btn-xl" onClick={onHostNew}>
        Host new
      </button>
    </IntroFrame>
  );
}
