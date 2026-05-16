"use client";

import React from "react";
import type { Stats } from "./kana-data";

type Props = {
  hardest: [string, Stats][];
};

export default function HardestKana({ hardest }: Props) {
  return (
    <div className="border-t pt-6 text-left">
      <h2 className="text-xl font-bold mb-3">Hardest Kana</h2>

      {hardest.length === 0 && <p className="opacity-60">No stats yet.</p>}

      <div className="space-y-2">
        {hardest.map(([kana, data]) => (
          <div key={kana} className="flex justify-between border-b pb-2">
            <span className="text-2xl">{kana}</span>

            <span>
              ❌ {data.wrong} | ✅ {data.correct}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
