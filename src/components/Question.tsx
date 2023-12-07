import { ChangeEvent, useState } from "react";

export default function Question({
  word,
  onCheckAnswer,
}: {
  word: string;
  onCheckAnswer: any;
}) {
  const [inputValue, setInputValue] = useState("");

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onCheckAnswer(inputValue);
      setInputValue("");
    }
  };

  return (
    <div>
      {word}
      <input
        type="text"
        className=" border"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}
