import Link from "next/link";
import KanaMatchingGame from "../components/game/KanaMatchingGame";
import KeyboardInfoTooltip from "../components/data/KeyboardInfoTooltip";

export default function GamePage() {
  return (
    <main
      className="min-h-screen flex flex-col items-center relative overflow-hidden px-6"
      style={{ backgroundColor: "#ffffff" }}
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none select-none overflow-hidden"
      >
        <span
          className="absolute -bottom-16 -left-10 text-[20rem] font-black leading-none opacity-[0.035]"
          style={{ color: "#000000", fontFamily: "serif" }}
        >
          遊
        </span>
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 w-px opacity-[0.07]"
            style={{
              left: `${(i + 1) * 20}%`,
              backgroundColor: "#0D3A5F",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-3xl px-6 py-14 flex flex-col items-center gap-10">
        {/* Back Button */}
        <div className="w-full flex items-center justify-between">
          {/* Back Button */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm border-2 border-[#0D3A5F] text-sm tracking-wide text-[#0D3A5F] font-semibold transition-all duration-200 ease-out hover:bg-[#0D3A5F] hover:text-[#F4E7D3]"
            style={{ fontFamily: "Georgia, serif" }}
          >
            ← Back
          </Link>

          <KeyboardInfoTooltip />
        </div>

        {/* Header */}
        <header className="flex flex-col items-center text-center gap-3">
          <h1
            className="text-3xl sm:text-4xl font-black text-[#0D3A5F]"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Kana Matching Game
          </h1>
          <p
            className="text-sm sm:text-base text-[#0D3A5F]/70 max-w-md"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Match the hiragana or katakana character to its correct romaji
            pronunciation.
          </p>
        </header>

        <KanaMatchingGame />
      </div>
    </main>
  );
}
