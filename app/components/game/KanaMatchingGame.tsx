"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  KANA,
  type KanaItem,
  type Mode,
  type GameMode,
  type Stats,
} from "../data/kana-data";
import { shuffle, getWeightedKana, speakKana } from "../data/kana-utils";
import GameHeader from "./GameHeader";
import GameModeToggle from "./GameModeToggle";
import MultipleChoice from "./MultipleChoice";
import TypingMode from "./TypingMode";
import HardestKana from "./HardestKana";

export default function KanaMatchingGame() {
  const [mode, setMode] = useState<Mode>("all");
  const [gameMode, setGameMode] = useState<GameMode>("Multiple Choices");

  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [lives, setLives] = useState(5);

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

    const wrongs = shuffle(
      kanaPool
        .filter((k) => k.romaji !== randomKana.romaji)
        .map((k) => k.romaji),
    ).slice(0, 3);

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
    if (typingAnswer.trim().toLowerCase() === currentKana.romaji)
      handleCorrect();
    else handleWrong();
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (
        gameMode === "Multiple Choices" &&
        ["1", "2", "3", "4"].includes(e.key)
      ) {
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

  const hardestKana = Object.entries(stats)
    .sort((a, b) => b[1].wrong - a[1].wrong)
    .slice(0, 5);

  if (lives <= 0) {
    return (
      <div className="w-full max-w-3xl mx-auto px-6 py-10">
        <div className="rounded-[2rem] border border-[#E7E3DE] bg-white/90 p-10 text-center shadow-[0_35px_80px_-35px_rgba(13,58,95,0.3)]">
          <p className="text-sm uppercase tracking-[0.4em] text-[#0D3A5F]/70 mb-4">
            Game Over
          </p>
          <h2 className="text-5xl font-black text-[#0D3A5F] mb-4">
            Final Score
          </h2>
          <p className="text-6xl font-semibold text-[#0D3A5F] mb-6">{score}</p>
          <button
            onClick={resetGame}
            className="inline-flex items-center justify-center rounded-full bg-[#0D3A5F] px-8 py-4 text-base font-semibold text-[#F4E7D3] transition hover:bg-[#492A76]"
          >
            Restart
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-10">
      <div className="rounded-[2rem] border border-[#E7E3DE] bg-white/95 shadow-[0_35px_80px_-35px_rgba(13,58,95,0.3)] overflow-hidden">
        <div className="p-8 md:p-10">
          <div className="flex flex-col gap-10">
            <div className="grid gap-6">
              <GameHeader score={score} streak={streak} lives={lives} />

              <div className="mt-1 rounded-[1.75rem] border border-[#E2E8F0] bg-[#F8FAFC] p-5 text-left text-xs uppercase tracking-[0.35em] text-[#0D3A5F]/70">
                <p className="mb-6 font-semibold mb-2 text-center">
                  Keyboard shortcuts
                </p>{" "}
                <ul className="space-y-1">
                  <li>H → Hiragana</li>
                  <li>K → Katakana</li>
                  <li>A → All</li>
                  <li>1-4 → Select answer</li>
                  <li>Enter → Submit typing</li>
                </ul>
              </div>

              <GameModeToggle
                mode={mode}
                setMode={setMode}
                gameMode={gameMode}
                setGameMode={setGameMode}
              />
            </div>

            {feedback ? (
              <div className=" rounded-3xl border border-[#B7D4E4] bg-[#DCE7F0] px-5 py-4 text-sm font-semibold text-[#0D3A5F]">
                {feedback}
              </div>
            ) : null}

            <div className="rounded-[1.75rem] border border-[#E2E8F0] bg-[#F8FAFC] p-10 text-center shadow-sm">
              <p className="text-sm uppercase tracking-[0.4em] text-[#0D3A5F]/70 mb-5">
                Match the character
              </p>
              <div
                className="text-[5rem] md:text-[6rem] font-black text-[#0D3A5F] mb-8"
                style={{ fontFamily: "Hiragino Mincho ProN, serif" }}
              >
                {currentKana.kana}
              </div>
              <button
                onClick={() => speakKana(currentKana.kana)}
                className="cursor-pointer inline-flex items-center gap-2 rounded-full border border-[#0D3A5F] px-6 py-3 text-sm font-semibold text-[#0D3A5F] transition hover:bg-[#0D3A5F] hover:text-[#F4E7D3]"
              >
                🔊 Hear pronunciation
              </button>
            </div>

            <div className="rounded-[1.75rem] border border-[#E2E8F0] bg-white p-8 shadow-sm">
              {gameMode === "Multiple Choices" ? (
                <MultipleChoice
                  options={options}
                  onSelect={handleMultipleChoice}
                />
              ) : (
                <TypingMode
                  typingAnswer={typingAnswer}
                  setTypingAnswer={setTypingAnswer}
                  onSubmit={handleTypingSubmit}
                />
              )}
            </div>

            <HardestKana hardest={hardestKana} />
          </div>
        </div>
      </div>
    </div>
  );
}
