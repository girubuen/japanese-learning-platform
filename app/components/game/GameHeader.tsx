"use client";

type Props = {
  score: number;
  streak: number;
  lives: number;
};

export default function GameHeader({ score, streak, lives }: Props) {
  return (
    <div
      className="
        grid
        gap-6

        rounded-[2rem]

        border border-white/30
        bg-white/40
        backdrop-blur-lg

        p-6 sm:p-8

        text-slate-900

        shadow-[0_16px_50px_rgba(0,0,0,0.08)]
      "
    >
      {/* header */}
      <div className="text-center sm:text-left">
        <h1
          className="
            text-3xl sm:text-4xl
            font-semibold
            tracking-tight
            text-slate-900
          "
          style={{
            fontFamily:
              "'SF Pro Display', 'Inter', 'Hiragino Sans', sans-serif",
          }}
        >
          Kana Stats
        </h1>

        <div className="mt-3 h-px w-20 bg-sky-300/50 mx-auto sm:mx-0" />
      </div>

      {/* stats grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {/* Score */}
        <div
          className="
            rounded-2xl

            border border-white/30
            bg-white/35

            backdrop-blur-lg

            p-4

            text-center sm:text-left

            shadow-[0_6px_18px_rgba(0,0,0,0.04)]
          "
        >
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
            Score
          </p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">{score}</p>
        </div>

        {/* Streak */}
        <div
          className="
            rounded-2xl

            border border-white/30
            bg-white/35

            backdrop-blur-lg

            p-4

            text-center sm:text-left

            shadow-[0_6px_18px_rgba(0,0,0,0.04)]
          "
        >
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
            Streak
          </p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">{streak}</p>
        </div>

        {/* Lives */}
        <div
          className="
            rounded-2xl

            border border-white/30
            bg-white/35

            backdrop-blur-lg

            p-4

            text-center sm:text-left

            shadow-[0_6px_18px_rgba(0,0,0,0.04)]
          "
        >
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
            Lives
          </p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">{lives}</p>
        </div>
      </div>
    </div>
  );
}
