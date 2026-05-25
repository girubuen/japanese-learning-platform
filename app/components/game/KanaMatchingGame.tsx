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
import {
  updateLocalProgress,
  syncProgressToSupabase,
} from "../data/kana-progress";
import GameHeader from "./GameHeader";
import GameModeToggle from "./GameModeToggle";
import MultipleChoice from "./MultipleChoice";
import TypingMode from "./TypingMode";
import HardestKana from "./HardestKana";

const GAME_CONFIG = {
  initialLives: 5,
  initialScore: 0,
  nextQuestionDelay: 1200, // ms
  masteryThreshold: 80, // % accuracy
} as const;

export default function KanaMatchingGame() {
  const userId = "guest"; // TODO: replace with auth system

  // ============ State Management ============
  const [mode, setMode] = useState<Mode>("all");
  const [gameMode, setGameMode] = useState<GameMode>("Multiple Choices");
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [lives, setLives] = useState<number>(GAME_CONFIG.initialLives);
  const [currentKana, setCurrentKana] = useState<KanaItem>(KANA[0]);
  const [options, setOptions] = useState<string[]>([]);
  const [feedback, setFeedback] = useState("");
  const [typingAnswer, setTypingAnswer] = useState("");
  const [lastKanaShown, setLastKanaShown] = useState<string | undefined>();
  const [stats, setStats] = useState<Record<string, Stats>>({});

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // ============ Persistence ============
  useEffect(() => {
    const saved = localStorage.getItem("kana-stats");
    if (saved) {
      try {
        setStats(JSON.parse(saved));
      } catch (e) {
        console.warn("Failed to load saved stats");
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("kana-stats", JSON.stringify(stats));
  }, [stats]);

  // ============ Game Logic ============
  const kanaPool = useMemo(() => {
    if (mode === "hiragana") return KANA.filter((k) => k.type === "hiragana");
    if (mode === "katakana") return KANA.filter((k) => k.type === "katakana");
    return KANA;
  }, [mode]);

  const generateQuestion = () => {
    const randomKana = getWeightedKana(kanaPool, stats, lastKanaShown);
    setCurrentKana(randomKana);
    setLastKanaShown(randomKana.kana);

    // Generate wrong answers
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
    setLastKanaShown(undefined);
    generateQuestion();
  }, [mode, kanaPool]);

  const updateStats = async (correct: boolean) => {
    // Update local state
    setStats((prev) => updateLocalProgress(prev, currentKana.kana, correct));

    // Sync to Supabase
    await syncProgressToSupabase({
      userId,
      kanaType: currentKana.type,
      character: currentKana.kana,
      correct,
    });
  };

  const scheduleNextQuestion = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(
      generateQuestion,
      GAME_CONFIG.nextQuestionDelay,
    );
  };

  const handleCorrect = () => {
    setScore((s) => s + 1);
    setStreak((s) => s + 1);
    updateStats(true);
    setFeedback("Correct! 🎉");
    speakKana(currentKana.kana);
    scheduleNextQuestion();
  };

  const handleWrong = () => {
    setLives((l) => l - 1);
    setStreak(0);
    updateStats(false);
    setFeedback(`Wrong! ${currentKana.kana} = ${currentKana.romaji}`);
    scheduleNextQuestion();
  };

  const handleMultipleChoice = (selected: string) => {
    if (selected === currentKana.romaji) handleCorrect();
    else handleWrong();
  };

  const handleTypingSubmit = () => {
    if (typingAnswer.trim().toLowerCase() === currentKana.romaji) {
      handleCorrect();
    } else {
      handleWrong();
    }
  };

  // ============ Keyboard Shortcuts ============
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
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [options, gameMode, typingAnswer]);

  // ============ Reset Game ============
  const resetGame = () => {
    setScore(0);
    setStreak(0);
    setLives(GAME_CONFIG.initialLives);
    setLastKanaShown(undefined);
    generateQuestion();
  };

  // ============ Compute Hardest Kana ============
  const hardestKana = Object.entries(stats)
    .sort((a, b) => b[1].wrong - a[1].wrong)
    .slice(0, 5);

  if (lives <= 0) {
    return (
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <div className="rounded-[1.75rem] sm:rounded-[2rem] border border-[#E7E3DE] bg-white/90 p-6 sm:p-10 text-center shadow-[0_35px_80px_-35px_rgba(13,58,95,0.3)]">
          <p className="text-xs sm:text-sm uppercase tracking-[0.4em] text-[#0D3A5F]/70 mb-4">
            Game Over
          </p>

          <h2 className="text-3xl sm:text-5xl font-black text-[#0D3A5F] mb-4">
            Final Score
          </h2>

          <p className="text-4xl sm:text-6xl font-semibold text-[#0D3A5F] mb-6">
            {score}
          </p>

          <button
            onClick={resetGame}
            className="inline-flex items-center justify-center rounded-full bg-[#0D3A5F] px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold text-[#F4E7D3] transition hover:bg-[#492A76]"
          >
            Restart
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      <div>
        {" "}
        <div className="p-5 sm:p-8 md:p-10">
          <div className="flex flex-col gap-6 sm:gap-10">
            {/* header */}
            <header className="flex flex-col items-center text-center gap-4 pt-0 pb-10">
              {" "}
              <h1
                className="
      text-4xl sm:text-5xl
      font-semibold
      tracking-tight
      text-slate-900
      bg-gradient-to-b from-slate-900 to-slate-700
      bg-clip-text
      text-transparent
    "
                style={{
                  fontFamily:
                    "'SF Pro Display', 'Inter', 'Hiragino Sans', system-ui, sans-serif",
                }}
              >
                Kana Matching Game
              </h1>
              {/* subtle iOS-style divider */}
              <div className="relative w-28 h-px">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-sky-300/40 to-transparent" />
              </div>
              <p
                className="
      text-sm sm:text-base
      text-slate-500
      max-w-sm
      leading-relaxed
      tracking-[0.01em]
    "
                style={{
                  fontFamily:
                    "'SF Pro Display', 'Inter', 'Hiragino Sans', system-ui, sans-serif",
                }}
              >
                Match each hiragana or katakana character with its correct
                romaji reading.
              </p>
            </header>

            {/* HEADER / STATS */}
            <div className="grid gap-6">
              <GameHeader score={score} streak={streak} lives={lives} />

              {/* SHORTCUTS */}
              <div
                className="
    hidden sm:block

    rounded-[2rem]

    border border-white/30
    bg-white/35
    backdrop-blur-lg

    p-5 sm:p-6

    text-center sm:text-left

    text-slate-700

    shadow-[0_10px_30px_rgba(0,0,0,0.06)]
  "
              >
                <p
                  className="
      mb-4 sm:mb-5

      text-xs
      uppercase
      tracking-[0.35em]

      font-semibold
      text-slate-600
    "
                >
                  Keyboard shortcuts
                </p>

                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex gap-2">
                    <span className="text-slate-400">1–4</span>
                    <span>→ Select answer</span>
                  </li>

                  <li className="flex gap-2">
                    <span className="text-slate-400">Enter</span>
                    <span>→ Submit typing</span>
                  </li>
                </ul>
              </div>

              <GameModeToggle
                mode={mode}
                setMode={setMode}
                gameMode={gameMode}
                setGameMode={setGameMode}
              />
            </div>

            {/* QUESTION CARD */}
            <div
              className="
    rounded-[2rem]

    border border-white/30
    bg-white/40
    backdrop-blur-lg

    p-6 sm:p-10

    text-center

    shadow-[0_16px_50px_rgba(0,0,0,0.08)]
  "
            >
              {/* title */}
              <p
                className="
      text-xs sm:text-sm
      uppercase
      tracking-[0.35em]
      text-slate-500

      mb-5 sm:mb-6
    "
              >
                Match the character
              </p>

              {/* feedback */}
              {feedback && (
                <div
                  className="
        mb-5 sm:mb-6

        rounded-2xl

        border border-sky-200/40
        bg-sky-50/60

        backdrop-blur-lg

        px-4 sm:px-5 py-3 sm:py-4

        text-sm font-medium
        text-slate-700

        shadow-[0_6px_18px_rgba(0,0,0,0.04)]
      "
                >
                  {feedback}
                </div>
              )}

              {/* kana */}
              <div
                className="
      text-[3.5rem] sm:text-[5rem] md:text-[6rem]
      font-semibold
      text-slate-900
      mb-6 sm:mb-8
      leading-none
    "
                style={{
                  fontFamily: "'Hiragino Mincho ProN', serif",
                }}
              >
                {currentKana.kana}
              </div>

              {/* audio button */}
              <button
                onClick={() => speakKana(currentKana.kana)}
                className="
      inline-flex items-center gap-2

      rounded-full

      border border-white/30
      bg-white/35
      backdrop-blur-lg

      px-5 sm:px-6 py-2.5 sm:py-3

      text-sm font-medium
      text-slate-700

      transition-all duration-200

      hover:bg-white/50
      hover:scale-[1.02]

      active:scale-[0.98]

      shadow-[0_6px_18px_rgba(0,0,0,0.05)]
    "
              >
                <span>🔊</span>
                <span className="hidden sm:inline">Hear pronunciation</span>
              </button>
            </div>

            {/* ANSWERS */}
            <div
              className="
    rounded-[2rem]

    border border-white/30
    bg-white/40
    backdrop-blur-lg

    p-5 sm:p-8

    shadow-[0_16px_50px_rgba(0,0,0,0.08)]
  "
            >
              {" "}
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

            {/* STATS */}
            <HardestKana hardest={hardestKana} />
          </div>
        </div>
      </div>
    </div>
  );
}
