"use client";

import type { Stats } from "../data/kana-data";

type Props = {
  hardest: [string, Stats][];
};

export default function HardestKana({ hardest }: Props) {
  return (
    <div className="rounded-[1.75rem] border border-[#E2E8F0] bg-[#F8FAFC] p-4 sm:p-6 text-center sm:text-left shadow-sm">
      <h2 className="mb-4 text-center text-lg sm:text-xl font-semibold text-[#0D3A5F]">
        Hardest Kana
      </h2>

      {hardest.length === 0 ? (
        <p className="text-sm text-[#0D3A5F]/70">
          No stats yet.
        </p>
      ) : (
        <div className="space-y-2 sm:space-y-3">
          {hardest.map(([kana, data]) => (
            <div
              key={kana}
              className="
                flex items-center justify-between
                rounded-2xl sm:rounded-3xl
                border border-[#E7EBF0]
                bg-white
                px-4 py-3 sm:px-5 sm:py-3
                transition
                hover:shadow-sm
              "
            >
              {/* Kana */}
              <span className="text-xl sm:text-2xl font-medium text-[#0D3A5F]">
                {kana}
              </span>

              {/* Stats */}
              <div className="text-right text-xs sm:text-sm text-[#0D3A5F]/80 leading-tight">
                <div className="flex gap-3 sm:gap-4 justify-end">
                  <span className="text-red-500 font-medium">
                    ❌ {data.wrong}
                  </span>
                  <span className="text-green-600 font-medium">
                    ✅ {data.correct}
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