import { ChangeEvent, useState } from "react";

export default function Test() {
  const [inputValue, setInputValue] = useState("");

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setInputValue("");
    }
  };

  return (
    <div>
      <div>
        <div>现在</div>
        <div>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
    </div>
  );
}
