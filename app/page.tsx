// app/page.tsx
// DojoKana Homepage — Minimalist Japanese aesthetic with animated ink-brush accents

"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-6"
      // style={{ backgroundColor: "#F4E7D3" }}
      // I replaced the BG w/ tori.mp4
    >
      {/* ── Decorative background glyphs (purely visual, aria-hidden) ── */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none select-none overflow-hidden"
      >
        {/* Large faded Kanji watermarks for ambience */}
        <span
          className="absolute -top-8 -left-6 text-[18rem] font-black leading-none opacity-[0.045]"
          style={{ color: "#0D3A5F", fontFamily: "serif" }}
        >
          道
        </span>
        <span
          className="absolute -bottom-10 -right-4 text-[16rem] font-black leading-none opacity-[0.045]"
          style={{ color: "#0D3A5F", fontFamily: "serif" }}
        >
          仮
        </span>
        {/* Thin vertical rule lines — evokes Japanese manuscript paper */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 w-px opacity-10"
            style={{
              left: `${(i + 1) * 16}%`,
              backgroundColor: "#0D3A5F",
            }}
          />
        ))}
      </div>

      {/* ── Hero content card ── */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-xl w-full gap-8">
        {/* Kana badge above title */}
        <div
          className="flex gap-3 text-2xl tracking-widest font-light"
          style={{ color: "#000000", fontFamily: "serif" }}
          aria-label="Hiragana and Katakana characters"
        >
          <span>あ</span>
          <span className="opacity-30">|</span>
          <span>ア</span>
        </div>

        {/* ── Logo / Title ── */}
        <div className="flex flex-col items-center gap-2">
          <h1
            className="text-6xl sm:text-7xl font-black tracking-tight leading-none"
            style={{
              color: "#0D3A5F",
              fontFamily: "'Georgia', 'Times New Roman', serif",
              letterSpacing: "-0.02em",
            }}
          >
            DojoKana
          </h1>

          {/* Ink-brush underline accent */}
          <div className="relative w-40 h-[3px] mt-1" aria-hidden>
            <div
              className="absolute inset-0 rounded-full"
              style={{ backgroundColor: "#0881A3" }}
            />
            <div
              className="absolute right-0 top-0 h-full w-1/3 rounded-full opacity-40"
              style={{ backgroundColor: "#0D3A5F" }}
            />
          </div>
        </div>

        {/* ── Subtitle ── */}
        <p
          className="text-lg sm:text-xl font-light leading-relaxed max-w-sm"
          style={{
            color: "#0D3A5F",
            opacity: 0.75,
            fontFamily: "Georgia, serif",
          }}
        >
          Master Hiragana and Katakana&nbsp;
          <span className="italic">the right way</span>
        </p>

        {/* ── CTA Buttons ── */}
        <div className="mt-4 flex w-full flex-col gap-3 sm:max-w-sm sm:flex-row sm:gap-4">
          {/* Primary — Start Learning */}
          <Link
            href="/practice/hiragana"
            className="
      group relative flex-1 overflow-hidden rounded-2xl
      px-6 py-4
      text-center text-sm sm:text-base font-semibold
      tracking-[0.04em]
      text-[#F4E7D3]
      shadow-[0_10px_30px_rgba(8,129,163,0.25)]
      transition-all duration-300 ease-out

      hover:-translate-y-0.5
      hover:shadow-[0_16px_40px_rgba(13,58,95,0.35)]

      active:scale-[0.98]

      focus:outline-none
      focus-visible:ring-2
      focus-visible:ring-[#0881A3]
      focus-visible:ring-offset-2
    "
            style={{
              background: "linear-gradient(135deg, #0881A3 0%, #0D3A5F 100%)",
              fontFamily: "Georgia, serif",
            }}
          >
            <span className="relative z-10">Start Learning</span>

            {/* glow */}
            <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-white/10" />
          </Link>

          {/* Secondary — Play Game */}
          <Link
            href="/game"
            className="
      group relative flex-1 overflow-hidden rounded-2xl
      border border-[#0D3A5F]/20
      bg-white/70 backdrop-blur-md

      px-6 py-4
      text-center text-sm sm:text-base font-semibold
      tracking-[0.04em]
      text-[#0D3A5F]

      shadow-[0_8px_24px_rgba(15,23,42,0.06)]
      transition-all duration-300 ease-out

      hover:-translate-y-0.5
      hover:border-[#0D3A5F]
      hover:bg-[#0D3A5F]
      hover:text-[#F4E7D3]
      hover:shadow-[0_14px_34px_rgba(13,58,95,0.18)]

      active:scale-[0.98]

      focus:outline-none
      focus-visible:ring-2
      focus-visible:ring-[#0D3A5F]
      focus-visible:ring-offset-2
    "
            style={{
              fontFamily: "Georgia, serif",
            }}
          >
            <span className="relative z-10">Play Game</span>
          </Link>
        </div>

        {/* ── Subtle footer hint ── */}
        <p
          className="text-xs tracking-widest uppercase mt-4 opacity-40"
          style={{ color: "#000000", fontFamily: "Georgia, serif" }}
        >
          Hiragana · Katakana · Kanji (Soon)
        </p>
      </div>

      {/* ── Thin bottom border accent ── */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-1"
        style={{ backgroundColor: "#0881A3", opacity: 0.6 }}
      />
    </main>
  );
}
