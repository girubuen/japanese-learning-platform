// app/page.tsx
// DojoKana Homepage — Minimalist Japanese aesthetic with animated ink-brush accents

"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-6"
      style={{ backgroundColor: "#F4E7D3" }}
    >
      {/* ── Decorative background glyphs (purely visual, aria-hidden) ── */}
      <div aria-hidden className="absolute inset-0 pointer-events-none select-none overflow-hidden">
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
          style={{ color: "#0881A3", fontFamily: "serif" }}
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
          style={{ color: "#0D3A5F", opacity: 0.75, fontFamily: "Georgia, serif" }}
        >
          Master Hiragana and Katakana&nbsp;
          <span className="italic">the right way</span>
        </p>

        {/* ── CTA Buttons ── */}
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm mt-2">

          {/* Primary — Start Learning */}
          <Link
            href="/practice/hiragana"
            className="flex-1 text-center py-4 px-8 rounded-sm font-semibold text-base tracking-wide transition-all duration-200 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            style={
              {
                backgroundColor: "#0881A3",
                color: "#F4E7D3",
                fontFamily: "Georgia, serif",
                letterSpacing: "0.04em",
                "--tw-ring-color": "#0881A3",
              } as React.CSSProperties
            }
            // Hover handled via Tailwind group + CSS custom props below
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = "#0D3A5F";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = "#0881A3";
            }}
          >
            Start Learning
          </Link>

          {/* Secondary — Play Game */}
          <Link
            href="/game"
            className="flex-1 text-center py-4 px-8 rounded-sm font-semibold text-base tracking-wide border-2 transition-all duration-200 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            style={
              {
                borderColor: "#0D3A5F",
                color: "#0D3A5F",
                backgroundColor: "transparent",
                fontFamily: "Georgia, serif",
                letterSpacing: "0.04em",
                "--tw-ring-color": "#0D3A5F",
              } as React.CSSProperties
            }
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.backgroundColor = "#0D3A5F";
              el.style.color = "#F4E7D3";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.backgroundColor = "transparent";
              el.style.color = "#0D3A5F";
            }}
          >
            Play Game
          </Link>
        </div>

        {/* ── Subtle footer hint ── */}
        <p
          className="text-xs tracking-widest uppercase mt-4 opacity-40"
          style={{ color: "#0D3A5F", fontFamily: "Georgia, serif" }}
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
