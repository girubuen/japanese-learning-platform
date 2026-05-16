"use client";

import React from "react";

type Props = {
  typingAnswer: string;
  setTypingAnswer: (s: string) => void;
  onSubmit: () => void;
};

export default function TypingMode({
  typingAnswer,
  setTypingAnswer,
  onSubmit,
}: Props) {
  return (
    <div className="flex flex-col gap-3 mb-6">
      <input
        value={typingAnswer}
        onChange={(e) => setTypingAnswer(e.target.value)}
        placeholder="Type romaji..."
        className="border-2 border-[#0D3A5F] rounded p-3 text-center"
      />

      <button
        onClick={onSubmit}
        className="bg-[#0D3A5F] text-[#F4E7D3] py-3 rounded"
      >
        Submit
      </button>
    </div>
  );
}
