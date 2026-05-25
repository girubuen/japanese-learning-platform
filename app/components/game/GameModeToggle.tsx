"use client";

import type { Mode, GameMode } from "../data/kana-data";

type Props = {
  mode: Mode;
  setMode: (m: Mode) => void;
  gameMode: GameMode;
  setGameMode: (g: GameMode) => void;
};

export default function GameModeToggle({
  mode,
  setMode,
  gameMode,
  setGameMode,
}: Props) {
  const baseButton =
    "rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2";

  const inactive =
    "border border-white/30 bg-white/35 backdrop-blur-lg text-slate-700 hover:bg-white/50 hover:scale-[1.02]";

  const active =
    "bg-slate-900 text-white shadow-[0_10px_30px_rgba(15,23,42,0.25)] scale-[1.02]";

  return (
    <div className="grid gap-8 text-slate-800">
      {/* Script selector */}
      <div>
        <p className="mb-4 text-xs uppercase tracking-[0.35em] text-slate-500 text-center sm:text-left">
          Choose script
        </p>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {(
            [
              { value: "all", jp: "全", label: "Both" },
              { value: "hiragana", jp: "あ", label: "Hiragana" },
              { value: "katakana", jp: "ア", label: "Katakana" },
            ] as const
          ).map((m) => {
            const isActive = mode === m.value;

            return (
              <button
                key={m.value}
                onClick={() => setMode(m.value)}
                className={`${baseButton} ${
                  isActive ? active : inactive
                }`}
              >
                <span className="text-base">{m.jp}</span>
                <span>{m.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Game mode selector */}
      <div>
        <p className="mb-4 text-xs uppercase tracking-[0.35em] text-slate-500 text-center sm:text-left">
          Game mode
        </p>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {(["Multiple Choices", "Typing"] as GameMode[]).map((m) => {
            const isActive = gameMode === m;

            return (
              <button
                key={m}
                onClick={() => setGameMode(m)}
                className={`${baseButton} ${
                  isActive ? active : inactive
                }`}
              >
                {m}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}