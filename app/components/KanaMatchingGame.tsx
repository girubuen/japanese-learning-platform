// app/components/KanaMatchingGame.tsx

"use client";

import { useEffect, useMemo, useRef, useState } from "react";

/* ======================================================
   DATA
====================================================== */

type KanaItem = {
  kana: string;
  romaji: string;
  type: "hiragana" | "katakana";
};

const KANA: KanaItem[] = [
  // Hiragana
  { kana: "あ", romaji: "a", type: "hiragana" },
  { kana: "い", romaji: "i", type: "hiragana" },
  { kana: "う", romaji: "u", type: "hiragana" },
  { kana: "え", romaji: "e", type: "hiragana" },
  { kana: "お", romaji: "o", type: "hiragana" },

  { kana: "か", romaji: "ka", type: "hiragana" },
  { kana: "き", romaji: "ki", type: "hiragana" },
  { kana: "く", romaji: "ku", type: "hiragana" },
  { kana: "け", romaji: "ke", type: "hiragana" },
  { kana: "こ", romaji: "ko", type: "hiragana" },

  { kana: "さ", romaji: "sa", type: "hiragana" },
  { kana: "し", romaji: "shi", type: "hiragana" },
  { kana: "す", romaji: "su", type: "hiragana" },
  { kana: "せ", romaji: "se", type: "hiragana" },
  { kana: "そ", romaji: "so", type: "hiragana" },

  // Katakana
  { kana: "ア", romaji: "a", type: "katakana" },
  { kana: "イ", romaji: "i", type: "katakana" },
  { kana: "ウ", romaji: "u", type: "katakana" },
  { kana: "エ", romaji: "e", type: "katakana" },
  { kana: "オ", romaji: "o", type: "katakana" },

  { kana: "カ", romaji: "ka", type: "katakana" },
  { kana: "キ", romaji: "ki", type: "katakana" },
  { kana: "ク", romaji: "ku", type: "katakana" },
  { kana: "ケ", romaji: "ke", type: "katakana" },
  { kana: "コ", romaji: "ko", type: "katakana" },

  { kana: "サ", romaji: "sa", type: "katakana" },
  { kana: "シ", romaji: "shi", type: "katakana" },
  { kana: "ス", romaji: "su", type: "katakana" },
  { kana: "セ", romaji: "se", type: "katakana" },
  { kana: "ソ", romaji: "so", type: "katakana" },
];

/* ======================================================
   TYPES
====================================================== */

type Mode = "all" | "hiragana" | "katakana";
type GameMode = "multiple" | "typing";

type Stats = {
  correct: number;
  wrong: number;
};

/* ======================================================
   HELPERS
====================================================== */

const shuffle = <T,>(arr: T[]) => [...arr].sort(() => Math.random() - 0.5);

const getWeightedKana = (pool: KanaItem[], stats: Record<string, Stats>) => {
  const weighted: KanaItem[] = [];

  pool.forEach((item) => {
    const itemStats = stats[item.kana] || {
      correct: 0,
      wrong: 0,
    };

    // More wrong answers = appears more often
    const weight = Math.max(1, itemStats.wrong * 3 - itemStats.correct + 1);

    for (let i = 0; i < weight; i++) {
      weighted.push(item);
    }
  });

  return weighted[Math.floor(Math.random() * weighted.length)];
};

/* ======================================================
   COMPONENT
====================================================== */

export default function KanaMatchingGame() {
  const [mode, setMode] = useState<Mode>("all");
  const [gameMode, setGameMode] = useState<GameMode>("multiple");

  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [lives, setLives] = useState(3);

  const [currentKana, setCurrentKana] = useState<KanaItem>(KANA[0]);

  const [options, setOptions] = useState<string[]>([]);
  const [feedback, setFeedback] = useState("");

  const [typingAnswer, setTypingAnswer] = useState("");

  const [stats, setStats] = useState<Record<string, Stats>>({});

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  /* ======================================================
     LOCAL STORAGE
  ====================================================== */

  useEffect(() => {
    const saved = localStorage.getItem("kana-stats");

    if (saved) {
      setStats(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("kana-stats", JSON.stringify(stats));
  }, [stats]);

  /* ======================================================
     FILTERED POOL
  ====================================================== */

  const kanaPool = useMemo(() => {
    if (mode === "hiragana") {
      return KANA.filter((k) => k.type === "hiragana");
    }

    if (mode === "katakana") {
      return KANA.filter((k) => k.type === "katakana");
    }

    return KANA;
  }, [mode]);

  /* ======================================================
     AUDIO
  ====================================================== */

  const speakKana = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);

    utterance.lang = "ja-JP";

    speechSynthesis.speak(utterance);
  };

  /* ======================================================
     QUESTION GENERATION
  ====================================================== */

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

  /* ======================================================
     STATS
  ====================================================== */

  const updateStats = (correct: boolean) => {
    setStats((prev) => ({
      ...prev,
      [currentKana.kana]: {
        correct: (prev[currentKana.kana]?.correct || 0) + (correct ? 1 : 0),

        wrong: (prev[currentKana.kana]?.wrong || 0) + (correct ? 0 : 1),
      },
    }));
  };

  /* ======================================================
     NEXT QUESTION
  ====================================================== */

  const nextQuestion = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      generateQuestion();
    }, 1000);
  };

  /* ======================================================
     ANSWERS
  ====================================================== */

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
    if (selected === currentKana.romaji) {
      handleCorrect();
    } else {
      handleWrong();
    }
  };

  const handleTypingSubmit = () => {
    if (typingAnswer.trim().toLowerCase() === currentKana.romaji) {
      handleCorrect();
    } else {
      handleWrong();
    }
  };

  /* ======================================================
     KEYBOARD CONTROLS
  ====================================================== */

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Multiple choice
      if (gameMode === "multiple" && ["1", "2", "3", "4"].includes(e.key)) {
        const index = Number(e.key) - 1;

        if (options[index]) {
          handleMultipleChoice(options[index]);
        }
      }

      // Typing submit
      if (gameMode === "typing" && e.key === "Enter") {
        handleTypingSubmit();
      }

      // Mode toggles
      if (e.key.toLowerCase() === "h") {
        setMode("hiragana");
      }

      if (e.key.toLowerCase() === "k") {
        setMode("katakana");
      }

      if (e.key.toLowerCase() === "a") {
        setMode("all");
      }
    };

    window.addEventListener("keydown", handler);

    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, [options, gameMode, typingAnswer]);

  /* ======================================================
     RESET
  ====================================================== */

  const resetGame = () => {
    setScore(0);
    setStreak(0);
    setLives(3);

    generateQuestion();
  };

  /* ======================================================
     HARDEST KANA
  ====================================================== */

  const hardestKana = Object.entries(stats)
    .sort((a, b) => b[1].wrong - a[1].wrong)
    .slice(0, 5);

  /* ======================================================
     GAME OVER
  ====================================================== */

  if (lives <= 0) {
    return (
      <div className="max-w-md mx-auto text-center p-6">
        <h1 className="text-4xl mb-4">Game Over</h1>

        <p className="mb-2">Final Score: {score}</p>

        <button
          onClick={resetGame}
          className="px-6 py-3 rounded bg-[#0D3A5F] text-[#F4E7D3]"
        >
          Restart
        </button>
      </div>
    );
  }

  /* ======================================================
     UI
  ====================================================== */

  return (
    <div className="w-full max-w-xl mx-auto p-6 text-center text-[#0D3A5F]">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Kana Trainer</h1>

        <div className="flex justify-center gap-4 text-sm opacity-70">
          <span>Score: {score}</span>
          <span>Streak: {streak}</span>
          <span>Lives: {lives}</span>
        </div>
      </div>

      {/* Kana Filter */}
      <div className="flex justify-center gap-2 mb-4">
        {(["all", "hiragana", "katakana"] as Mode[]).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-3 py-2 rounded border ${
              mode === m ? "bg-[#0D3A5F] text-[#F4E7D3]" : "border-[#0D3A5F]"
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      {/* Game Mode */}
      <div className="flex justify-center gap-2 mb-8">
        {(["multiple", "typing"] as GameMode[]).map((m) => (
          <button
            key={m}
            onClick={() => setGameMode(m)}
            className={`px-3 py-2 rounded border ${
              gameMode === m
                ? "bg-[#0D3A5F] text-[#F4E7D3]"
                : "border-[#0D3A5F]"
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      {/* Kana Display */}
      <div
        className="text-8xl mb-8"
        style={{
          fontFamily: "Hiragino Mincho ProN, serif",
        }}
      >
        {currentKana.kana}
      </div>

      {/* Multiple Choice */}
      {gameMode === "multiple" && (
        <div className="grid grid-cols-2 gap-3 mb-6">
          {options.map((option, index) => (
            <button
              key={option + index}
              onClick={() => handleMultipleChoice(option)}
              className="border-2 border-[#0D3A5F] p-4 rounded hover:bg-[#0D3A5F] hover:text-[#F4E7D3] transition"
            >
              {index + 1}. {option}
            </button>
          ))}
        </div>
      )}

      {/* Typing Mode */}
      {gameMode === "typing" && (
        <div className="flex flex-col gap-3 mb-6">
          <input
            value={typingAnswer}
            onChange={(e) => setTypingAnswer(e.target.value)}
            placeholder="Type romaji..."
            className="border-2 border-[#0D3A5F] rounded p-3 text-center"
          />

          <button
            onClick={handleTypingSubmit}
            className="bg-[#0D3A5F] text-[#F4E7D3] py-3 rounded"
          >
            Submit
          </button>
        </div>
      )}

      {/* Feedback */}
      {feedback && <p className="font-semibold mb-6">{feedback}</p>}

      {/* Audio */}
      <button
        onClick={() => speakKana(currentKana.kana)}
        className="underline mb-8 cursor-pointer hover:opacity-70 transition"
      >
        🔊 Hear Pronunciation
      </button>

      {/* Stats */}
      <div className="border-t pt-6 text-left">
        <h2 className="text-xl font-bold mb-3">Hardest Kana</h2>

        {hardestKana.length === 0 && (
          <p className="opacity-60">No stats yet.</p>
        )}

        <div className="space-y-2">
          {hardestKana.map(([kana, data]) => (
            <div key={kana} className="flex justify-between border-b pb-2">
              <span className="text-2xl">{kana}</span>

              <span>
                ❌ {data.wrong} | ✅ {data.correct}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Keyboard Help */}
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
