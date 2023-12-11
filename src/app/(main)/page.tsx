"use client";

import Answer from "@/components/Answer";
import Question from "@/components/Question";
import { useEffect, useRef, useState } from "react";

const failedCountTotal = 3;

export default function Main() {
  const [currentMode, setCurrentMode] = useState<
    "loading" | "question" | "anwser"
  >("loading");

  let questionWord = "";
  let answerWord = "";
  let answerSoundmark = "";

  const failedCount = useRef(0);
  const statementIndex = useRef(0);
  const currentCourse = useRef<any>({});

  function updateWord() {
    if (!currentCourse.current.statements) return;

    const { chinese, english, soundmark } =
      currentCourse.current.statements[statementIndex.current];

    questionWord = chinese;
    answerWord = english;
    answerSoundmark = soundmark;
  }

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("http://localhost:3000/api/main");
      const data = await res.json();
      currentCourse.current.statements = data.data;
      setCurrentMode("question");
    }
    fetchData();
  }, []);

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

  updateWord();

  const viewMap = {
    loading: <div>loging...</div>,
    question: <Question word={questionWord} onCheckAnswer={checkAnswer} />,
    anwser: (
      <Answer
        word={answerWord}
        soundmark={answerSoundmark}
        onToNextStatement={handleToNextStatement}
      />
    ),
  };

  return <div>{viewMap[currentMode]}</div>;
}
