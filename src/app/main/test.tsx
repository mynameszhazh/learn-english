import { ChangeEvent, useState } from "react";

const failedCountTotal = 3;
let failedCount = 0;

export default function Test() {
  const chinese = "现在";
  const english = "now";
  const answer = "now";
  const soundmark = "/nav/";

  const [inputValue, setInputValue] = useState("");
  const [currentValue, setCurrentValue] = useState(chinese);
  const [dispatchSoundMark, setDispatchSoundMark] = useState(soundmark);
  const [currentStatus, setCurrentStatus] = useState("question");

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

  function checkValidaty(value: string): boolean {
    return value === answer;
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (checkValidaty(inputValue)) {
        handleAnwser();
      } else {
        failedCount++;
        setInputValue("");
        setCurrentStatus("question");
        console.log("提示重新输入");
        if (failedCount > failedCountTotal) {
          handleAnwser();
        }
      }
    }
  };

  function handleAnwser() {
    console.log("检验正确");
    setCurrentValue(english);
    setDispatchSoundMark(soundmark);
    setCurrentStatus("anwser");
    // 显示英文
    console.log("读一下");
  }
  const anwserView = (
    <div>
      <div>{currentValue}</div>
      <div>{dispatchSoundMark}</div>
      <div>
        <audio controls>
          <source
            src="https://dict.youdao.com/dictvoice?audio=now&type=1"
            type="audio/mpeg"
          ></source>
        </audio>
      </div>
    </div>
  );
  const questionView = <div>{currentValue}</div>;

  return (
    <div>
      <div>
        {currentStatus === "question" ? questionView : anwserView}
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
