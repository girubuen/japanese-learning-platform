"use client";

type Props = {
  score: number;
  streak: number;
  lives: number;
};

export default function GameHeader({ score, streak, lives }: Props) {
  return (
    <div className="grid gap-6 rounded-[1.75rem] border border-[#E2E8F0] bg-[#F8FAFC] p-6 text-[#0D3A5F] shadow-sm">
      <div className="text-center sm:text-left">
        {/* <p className="text-sm uppercase tracking-[0.4em] text-[#0D3A5F]/70">
    Kana Matching Game
  </p> */}
        <h1 className="mt-3 text-4xl font-black">Kana Stats</h1>
      </div>

      <div className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-3">
        <div className="rounded-3xl border border-[#E7EBF0] bg-white p-4 text-center sm:text-left">
          <p className="text-[0.7rem] uppercase tracking-[0.28em] text-[#0D3A5F]/70">
            Score
          </p>
          <p className="mt-2 text-2xl font-semibold">{score}</p>
        </div>

        <div className="rounded-3xl border border-[#E7EBF0] bg-white p-4 text-center sm:text-left">
          <p className="text-[0.7rem] uppercase tracking-[0.28em] text-[#0D3A5F]/70">
            Streak
          </p>
          <p className="mt-2 text-2xl font-semibold">{streak}</p>
        </div>

        <div className="rounded-3xl border border-[#E7EBF0] bg-white p-4 text-center sm:text-left">
          <p className="text-[0.7rem] uppercase tracking-[0.28em] text-[#0D3A5F]/70">
            Lives
          </p>
          <p className="mt-2 text-2xl font-semibold">{lives}</p>
        </div>
      </div>
    </div>
  );
}
