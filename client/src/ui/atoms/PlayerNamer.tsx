import { useState } from "react";

interface Props {
  onSetName(name: string): void;
  initialValue?: string;
  takenNames: string[];
}

function PlayerNamer({
  onSetName,
  initialValue = "",
  takenNames,
}: Props): JSX.Element {
  const [inputText, setInputText] = useState(initialValue);

  const handleSetClick = () => {
    if (takenNames.includes(inputText)) {
      window.alert("Somebody is already using that name");
    } else if (inputText.length > 0) {
      onSetName(inputText);
    } else {
      window.alert("Can't have an empty player name");
    }
  };

  return (
    <>
      <input
        className="input input-bordered w-full"
        type="text"
        placeholder="Enter your name"
        value={inputText}
        onChange={(e) => {
          setInputText(e.target.value);
        }}
      />
      <button
        className="btn btn-block"
        disabled={inputText.length === 0}
        onClick={handleSetClick}
      >
        Set player name
      </button>
    </>
  );
}

export default PlayerNamer;
