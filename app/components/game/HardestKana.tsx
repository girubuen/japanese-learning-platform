"use client";

import type { Stats } from "../data/kana-data";

type Props = {
  hardest: [string, Stats][];
};

export default function HardestKana({ hardest }: Props) {
  return (
    <div
      className="
        rounded-[2rem]

        border border-white/30
        bg-white/40
        backdrop-blur-lg

        p-4 sm:p-6

        shadow-[0_16px_50px_rgba(0,0,0,0.08)]
      "
    >
      {/* title */}
      <h2
        className="
          mb-4 sm:mb-6

          text-lg sm:text-xl
          font-semibold
          text-slate-900
          text-center sm:text-left
        "
        style={{
          fontFamily:
            "'SF Pro Display', 'Inter', 'Hiragino Sans', sans-serif",
        }}
      >
        Hardest Kana
      </h2>

      {/* empty state */}
      {hardest.length === 0 ? (
        <p className="text-sm text-slate-500 text-center sm:text-left">
          No stats yet.
        </p>
      ) : (
        <div className="space-y-2 sm:space-y-3">
          {hardest.map(([kana, data]) => (
            <div
              key={kana}
              className="
                flex items-center justify-between

                rounded-2xl

                border border-white/30
                bg-white/35
                backdrop-blur-lg

                px-4 py-3 sm:px-5 sm:py-3

                transition-all duration-200

                hover:bg-white/50
                hover:scale-[1.01]

                shadow-[0_6px_18px_rgba(0,0,0,0.04)]
              "
            >
              {/* kana */}
              <span
                className="
                  text-xl sm:text-2xl
                  font-medium
                  text-slate-900
                "
                style={{
                  fontFamily: "'Hiragino Mincho ProN', serif",
                }}
              >
                {kana}
              </span>

              {/* stats */}
              <div className="text-right text-xs sm:text-sm leading-tight">
                <div className="flex gap-3 sm:gap-4 justify-end text-slate-600">
                  <span className="flex items-center gap-1">
                    <span className="text-rose-400">✕</span>
                    {data.wrong}
                  </span>

                  <span className="flex items-center gap-1">
                    <span className="text-emerald-400">✓</span>
                    {data.correct}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}