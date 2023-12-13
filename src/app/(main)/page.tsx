"use client";

import Answer from "@/components/Answer";
import Question from "@/components/Question";
import { useEffect, useState } from "react";
import { useCounter, useFailedCount } from "../../store/course";

export default function Main() {
  const [currentMode, setCurrentMode] = useState<"question" | "anwser">(
    "question"
  );

  const { fetchCourse, getCurrentStatement, toNextStatement, checkCorrect } =
    useCounter();

  const { increaseFailedCount } = useFailedCount();

  useEffect(() => {
    fetchCourse();
  }, []);

  function handleToNextStatement() {
    toNextStatement();
    setCurrentMode("question");
  }

  function checkAnswer(value: string) {
    if (checkCorrect(value)) {
      setCurrentMode("anwser");
    } else {
      // increaseFailedCount();
      setCurrentMode("anwser");
      // if (failedCount.current >= failedCountTotal) {
      //   failedCount.current = 0;
      // }
    }
  }

  const viewMap = {
    loading: <div>loging...</div>,
    question: (
      <Question
        word={getCurrentStatement()?.chinese}
        onCheckAnswer={checkAnswer}
      />
    ),
    anwser: (
      <Answer
        word={getCurrentStatement()?.english}
        soundmark={getCurrentStatement()?.soundmark}
        onToNextStatement={handleToNextStatement}
      />
    ),
  };

  return <div>{viewMap[currentMode]}</div>;
}
