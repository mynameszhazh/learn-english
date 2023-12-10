"use client";

import Answer from "@/components/Answer";
import Question from "@/components/Question";
import { useEffect, useRef, useState } from "react";

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

export default function Main() {
  const [currentMode, setCurrentMode] = useState<"question" | "anwser">(
    "question"
  );
  const [questionWord, setQuestionWord] = useState("");
  const [answerWord, setAnswerWord] = useState("");
  const [answerSoundmark, setAnswerSoundmark] = useState("");

  const failedCount = useRef(0);
  const statementIndex = useRef(0);
  const currentCourse = useRef<any>({});

  function updateWord() {
    const { chinese, english, soundmark } =
      currentCourse.current.statements[statementIndex.current];
    setQuestionWord(chinese);
    setAnswerWord(english);
    setAnswerSoundmark(soundmark);
  }

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("http://localhost:3000/api/main");
      const data = await res.json();
      currentCourse.current.statements = data.data;
      updateWord();
    }
    fetchData();
  }, []);

  function handleToNextStatement() {
    statementIndex.current++;
    setCurrentMode("question");
    updateWord();
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
