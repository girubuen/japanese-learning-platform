// app/components/KanaMatchingGame.tsx

"use client";

import {useEffect, useMemo, useRef, useState } from "react";
import { KANA, type KanaItem, type Mode, type GameMode, type Stats } from "./kana-data";
import { shuffle, getWeightedKana, speakKana } from "./kana-utils";
import KanaHeader from "./KanaHeader";
import ModeToggle from "./ModeToggle";
import MultipleChoice from "./MultipleChoice";
import TypingMode from "./TypingMode";
import HardestKana from "./HardestKana";

export default function KanaMatchingGame() {
  const [mode, setMode] = useState<Mode>("all");
  const [gameMode, setGameMode] = useState<GameMode>("Multiple Choices");

  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [lives, setLives] = useState(3);

  const [currentKana, setCurrentKana] = useState<KanaItem>(KANA[0]);

  const [options, setOptions] = useState<string[]>([]);
  const [feedback, setFeedback] = useState("");

  const [typingAnswer, setTypingAnswer] = useState("");

  const [stats, setStats] = useState<Record<string, Stats>>({});

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("kana-stats");

    if (saved) {
      setStats(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("kana-stats", JSON.stringify(stats));
  }, [stats]);

  const kanaPool = useMemo(() => {
    if (mode === "hiragana") return KANA.filter((k) => k.type === "hiragana");
    if (mode === "katakana") return KANA.filter((k) => k.type === "katakana");
    return KANA;
  }, [mode]);

  const generateQuestion = () => {
    const randomKana = getWeightedKana(kanaPool, stats);

    setCurrentKana(randomKana);

    const wrongs = shuffle(kanaPool.filter((k) => k.romaji !== randomKana.romaji).map((k) => k.romaji)).slice(0, 3);

    setOptions(shuffle([randomKana.romaji, ...wrongs]));

    setFeedback("");
    setTypingAnswer("");
  };

  useEffect(() => {
    generateQuestion();
  }, [mode]);

  const updateStats = (correct: boolean) => {
    setStats((prev) => ({
      ...prev,
      [currentKana.kana]: {
        correct: (prev[currentKana.kana]?.correct || 0) + (correct ? 1 : 0),
        wrong: (prev[currentKana.kana]?.wrong || 0) + (correct ? 0 : 1),
      },
    }));
  };

  const nextQuestion = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      generateQuestion();
    }, 1000);
  };

  const handleCorrect = () => {
    setScore((s) => s + 1);
    setStreak((s) => s + 1);

    updateStats(true);

    setFeedback("Correct! 🎉");

    speakKana(currentKana.kana);

    nextQuestion();
  };

  const handleWrong = () => {
    setLives((l) => l - 1);
    setStreak(0);

    updateStats(false);

    setFeedback(`Wrong! ${currentKana.kana} = ${currentKana.romaji}`);

    nextQuestion();
  };

  const handleMultipleChoice = (selected: string) => {
    if (selected === currentKana.romaji) handleCorrect();
    else handleWrong();
  };

  const handleTypingSubmit = () => {
    if (typingAnswer.trim().toLowerCase() === currentKana.romaji) handleCorrect();
    else handleWrong();
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (gameMode === "Multiple Choices" && ["1", "2", "3", "4"].includes(e.key)) {
        const index = Number(e.key) - 1;
        if (options[index]) handleMultipleChoice(options[index]);
      }

      if (gameMode === "Typing" && e.key === "Enter") {
        handleTypingSubmit();
      }

      if (e.key.toLowerCase() === "h") setMode("hiragana");
      if (e.key.toLowerCase() === "k") setMode("katakana");
      if (e.key.toLowerCase() === "a") setMode("all");
    };

    window.addEventListener("keydown", handler);

    return () => window.removeEventListener("keydown", handler);
  }, [options, gameMode, typingAnswer]);

  const resetGame = () => {
    setScore(0);
    setStreak(0);
    setLives(3);

    generateQuestion();
  };

  const hardestKana = Object.entries(stats).sort((a, b) => b[1].wrong - a[1].wrong).slice(0, 5);

  if (lives <= 0) {
    return (
      <div className="max-w-md mx-auto text-center p-6">
        <h1 className="text-4xl mb-4">Game Over</h1>

        <p className="mb-2">Final Score: {score}</p>

        <button onClick={resetGame} className="px-6 py-3 rounded bg-[#0D3A5F] text-[#F4E7D3]">
          Restart
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto p-6 text-center text-[#0D3A5F]">
      <KanaHeader score={score} streak={streak} lives={lives} />

      <ModeToggle mode={mode} setMode={setMode} gameMode={gameMode} setGameMode={setGameMode} />

      <div className="text-8xl mb-8" style={{ fontFamily: "Hiragino Mincho ProN, serif" }}>
        {currentKana.kana}
      </div>

      {gameMode === "Multiple Choices" && <MultipleChoice options={options} onSelect={handleMultipleChoice} />}

      {gameMode === "Typing" && (
        <TypingMode typingAnswer={typingAnswer} setTypingAnswer={setTypingAnswer} onSubmit={handleTypingSubmit} />
      )}

      {feedback && <p className="font-semibold mb-6">{feedback}</p>}

      <button onClick={() => speakKana(currentKana.kana)} className="underline mb-8 cursor-pointer hover:opacity-70 transition">
        🔊 Hear Pronunciation
      </button>

      <HardestKana hardest={hardestKana} />

      <div className="mt-8 text-sm opacity-60 text-left">
        <p>Keyboard Shortcuts:</p>
        <p>1-4 → Select answer</p>
        <p>Enter → Submit typing</p>
        <p>H → Hiragana</p>
        <p>K → Katakana</p>
        <p>A → All</p>
      </div>
    </div>
  );
}