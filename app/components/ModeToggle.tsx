"use client";
import type { Mode, GameMode } from "./kana-data";

type Props = {
  mode: Mode;
  setMode: (m: Mode) => void;
  gameMode: GameMode;
  setGameMode: (g: GameMode) => void;
};

export default function ModeToggle({
  mode,
  setMode,
  gameMode,
  setGameMode,
}: Props) {
  return (
    <>
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

      <div className="flex justify-center gap-2 mb-8">
        {(["Multiple Choices", "Typing"] as GameMode[]).map((m) => (
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
    </>
  );
}
