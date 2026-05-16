"use client";

import React from "react";

type Props = {
  score: number;
  streak: number;
  lives: number;
};

export default function KanaHeader({ score, streak, lives }: Props) {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold mb-2">Kana Trainer</h1>

      <div className="flex justify-center gap-4 text-sm opacity-70">
        <span>Score: {score}</span>
        <span>Streak: {streak}</span>
        <span>Lives: {lives}</span>
      </div>
    </div>
  );
}
