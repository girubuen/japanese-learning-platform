import Link from "next/link";
import KanaMatchingGame from "../components/game/KanaMatchingGame";

export default function GamePage() {
  return (
    <main
      className="
        min-h-screen
        flex flex-col items-center
        relative
        overflow-hidden
        px-6
      "
    >
      {/* ambient background */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none overflow-hidden"
      >
        {/* soft glow */}
        <div
          className="
            absolute -top-40 left-1/2 -translate-x-1/2
            w-[800px] h-[800px]
            rounded-full
            bg-sky-200/10
            blur-3xl
          "
        />

        <div
          className="
            absolute bottom-0 right-0
            w-[500px] h-[500px]
            rounded-full
            bg-slate-300/10
            blur-3xl
          "
        />

        {/* kanji watermark */}
        <span
          className="
            absolute -bottom-16 -left-10
            text-[20rem] sm:text-[22rem]
            font-black leading-none
            text-slate-900/[0.04]
          "
          style={{
            fontFamily:
              "'SF Pro Display', 'Hiragino Sans', 'Noto Sans JP', sans-serif",
          }}
        >
          遊
        </span>

        {/* grid lines */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 w-px bg-slate-300/20"
            style={{ left: `${(i + 1) * 20}%` }}
          />
        ))}
      </div>

      {/* content wrapper */}
      <div
        className="
          relative z-10

          w-full max-w-3xl

          px-6 py-14

          flex flex-col items-center gap-10
        "
      >
        {/* top bar */}
        <div className="w-full flex items-center justify-start">
          <Link
            href="/"
            className="
              inline-flex items-center gap-2

              px-5 py-2.5

              rounded-full

              border border-white/30
              bg-white/40
              backdrop-blur-lg

              text-sm font-medium

              text-slate-700

              shadow-[0_6px_18px_rgba(0,0,0,0.05)]

              transition-all duration-200

              hover:bg-white/60
              hover:scale-[1.02]

              active:scale-[0.98]
            "
            style={{
              fontFamily:
                "'SF Pro Display', 'Inter', 'Hiragino Sans', sans-serif",
            }}
          >
            ← Back
          </Link>
        </div>

        {/* header */}
        <header className="flex flex-col items-center text-center gap-3">
          <h1
            className="
              text-4xl sm:text-5xl
              font-semibold
              tracking-tight
              text-slate-900
            "
            style={{
              fontFamily:
                "'SF Pro Display', 'Inter', 'Hiragino Sans', sans-serif",
            }}
          >
            Kana Matching Game
          </h1>

          <div className="h-px w-24 bg-sky-300/50" />

          <p
            className="
              text-sm sm:text-base
              text-slate-600
              max-w-md
              leading-relaxed
            "
            style={{
              fontFamily:
                "'SF Pro Display', 'Inter', 'Hiragino Sans', sans-serif",
            }}
          >
            Match the hiragana or katakana character to its correct romaji
            pronunciation.
          </p>
        </header>

        {/* game container wrapper (NEW iOS card feel) */}
        <div
          className="
            w-full

            rounded-[2rem]

            border border-white/30
            bg-white/40
            backdrop-blur-lg

            p-6 sm:p-10

            shadow-[0_16px_50px_rgba(0,0,0,0.08)]
          "
        >
          <KanaMatchingGame />
        </div>
      </div>
    </main>
  );
}