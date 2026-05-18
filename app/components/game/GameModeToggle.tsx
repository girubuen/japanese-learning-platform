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
  return (
    <div className="grid gap-6 text-[#0D3A5F]">
      {/* Script selector */}
      <div>
        <p className="mb-3 text-center text-xs uppercase tracking-[0.4em] text-[#0D3A5F]/70 sm:text-left">
          Choose script
        </p>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {(
            [
              { value: "all", jp: "全", label: "Both" },
              { value: "hiragana", jp: "あ", label: "Hiragana" },
              { value: "katakana", jp: "ア", label: "Katakana" },
            ] as const
          ).map((m) => (
            <button
              key={m.value}
              onClick={() => setMode(m.value)}
              className={`cursor-pointer rounded-[1.25rem] border px-4 py-3 text-sm font-semibold transition flex items-center justify-center gap-2 ${
                mode === m.value
                  ? "bg-[#0D3A5F] text-[#F4E7D3] border-transparent"
                  : "border-[#D9E2EC] bg-white text-[#0D3A5F] hover:border-[#0D3A5F]/70"
              }`}
            >
              <span className="text-base sm:text-sm">{m.jp}</span>
              <span>{m.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Game mode selector */}
      <div>
        <p className="mb-3 text-center text-xs uppercase tracking-[0.4em] text-[#0D3A5F]/70 sm:text-left">
          Game mode
        </p>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {(["Multiple Choices", "Typing"] as GameMode[]).map((m) => (
            <button
              key={m}
              onClick={() => setGameMode(m)}
              className={`cursor-pointer rounded-[1.25rem] border px-4 py-3 text-sm font-semibold transition ${
                gameMode === m
                  ? "bg-[#0D3A5F] text-[#F4E7D3] border-transparent"
                  : "border-[#D9E2EC] bg-white text-[#0D3A5F] hover:border-[#0D3A5F]/70"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
