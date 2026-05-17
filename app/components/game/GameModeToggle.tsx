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
    <div className="grid gap-4 text-[#0D3A5F]">
      <div>
        <p className="text-xs uppercase tracking-[0.4em] text-[#0D3A5F]/70 mb-3">
          Choose script
        </p>
        <div className="grid grid-cols-3 gap-3">
          {(
            [
              { value: "all", label: "全 Both" },
              { value: "hiragana", label: "あ Hiragana" },
              { value: "katakana", label: "ア Katakana" },
            ] as const
          ).map((m) => (
            <button
              key={m.value}
              onClick={() => setMode(m.value)}
              className={`rounded-[1.25rem] border px-4 py-3 text-sm font-semibold transition ${
                mode === m.value
                  ? "bg-[#0D3A5F] text-[#F4E7D3] border-transparent"
                  : "border-[#D9E2EC] bg-white text-[#0D3A5F] hover:border-[#0D3A5F]/70"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs uppercase tracking-[0.4em] text-[#0D3A5F]/70 mb-3">
          Game mode
        </p>
        <div className="grid grid-cols-2 gap-3">
          {(["Multiple Choices", "Typing"] as GameMode[]).map((m) => (
            <button
              key={m}
              onClick={() => setGameMode(m)}
              className={`rounded-[1.25rem] border px-4 py-3 text-sm font-semibold transition ${
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
