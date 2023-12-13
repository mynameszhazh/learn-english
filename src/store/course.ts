"use client";
import { create } from "zustand";

// interface CourseData {
// }

interface Statement {
  chinese: string;
  english: string;
  soundmark: string;
}

interface State {
  currentCourse?: any;
  statementIndex: number;
  fetchCourse: () => void;
  getCurrentStatement: () => Statement;
  toNextStatement: () => void;
  checkCorrect: (i: string) => boolean;
}

export const useCounter = create<State>((set, get) => ({
  statementIndex: 0,
  currentCourse: undefined,
  async fetchCourse() {
    const res = await fetch("http://localhost:3000/api/main");
    const data = await res.json();
    set({
      currentCourse: data.data,
    });
  },
  getCurrentStatement() {
    const { currentCourse, statementIndex } = get();
    return currentCourse?.statements[statementIndex];
  },
  toNextStatement() {
    set((state) => {
      return {
        statementIndex: state.statementIndex + 1,
      };
    });
  },
  checkCorrect(input: string) {
    return input === get().currentCourse.english;
  },
}));

const failedCountTotal = 3;
export const useFailedCount = create<any>((set: any) => ({
  failedCount: 0,
  increaseFailedCount() {
    set((state: any) => {
      failedCount: state.failedCount + 1;
    });
  },
}));
