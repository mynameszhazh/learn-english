import Answer from "@/components/Answer";
import Question from "@/components/Question";
import { useRef, useState } from "react";

const failedCountTotal = 3;

const courseData = [
  {
    name: "第一堂课",
    statements: [
      {
        chinese: "现在",
        english: "now",
        soundmark: "/nav/",
      },
      {
        chinese: "爱",
        english: "love",
        soundmark: "/ai/",
      },
    ],
  },
];

export default function Practice() {
  const [currentMode, setCurrentMode] = useState<"question" | "anwser">(
    "question"
  );

  const failedCount = useRef(0);
  const statementIndex = useRef(0);

  const { chinese, english, soundmark } =
    courseData[0].statements[statementIndex.current];

  const questionWord = chinese;
  const answerWord = english;
  const answerSoundmark = soundmark;

  function handleToNextStatement() {
    statementIndex.current++;
    setCurrentMode("question");
  }

  function checkAnswer(value: string) {
    if (checkCorrect(value)) {
      setCurrentMode("anwser");
    } else {
      failedCount.current++;
      if (failedCount.current >= failedCountTotal) {
        setCurrentMode("anwser");
        failedCount.current = 0;
      }
    }
  }

  function checkCorrect(value: string): boolean {
    return value === answerWord;
  }

  return (
    <div>
      {currentMode === "question" ? (
        <Question word={questionWord} onCheckAnswer={checkAnswer} />
      ) : (
        <Answer
          word={answerWord}
          soundmark={answerSoundmark}
          onToNextStatement={handleToNextStatement}
        />
      )}
    </div>
  );
}
