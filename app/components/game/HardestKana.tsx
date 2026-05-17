"use client";

import type { Stats } from "../data/kana-data";

type Props = {
  hardest: [string, Stats][];
};

export default function HardestKana({ hardest }: Props) {
  return (
    <div className="rounded-[1.75rem] border border-[#E2E8F0] bg-[#F8FAFC] p-6 text-left shadow-sm">
      <h2 className="text-xl font-semibold text-[#0D3A5F] mb-4">
        Hardest Kana
      </h2>

      {hardest.length === 0 ? (
        <p className="text-sm text-[#0D3A5F]/70">No stats yet.</p>
      ) : (
        <div className="space-y-3">
          {hardest.map(([kana, data]) => (
            <div
              key={kana}
              className="flex items-center justify-between rounded-3xl border border-[#E7EBF0] bg-white px-4 py-3"
            >
              <span className="text-2xl">{kana}</span>
              <span className="text-sm text-[#0D3A5F]/80">
                ❌ {data.wrong} • ✅ {data.correct}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
