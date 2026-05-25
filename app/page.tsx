// app/page.tsx

"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <main
      className="
        relative
        min-h-screen
        overflow-hidden

        flex
        items-center
        justify-center

        px-6
      "
    >
      {/* ambient background */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none overflow-hidden"
      >
        <div
          className="
            absolute -top-40 left-1/2 -translate-x-1/2
            w-[900px] h-[900px]
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

        {/* kana watermarks */}
        <span
          className="
            absolute -top-10 -left-8
            text-[18rem] sm:text-[22rem]
            font-black leading-none
            text-slate-900/[0.04]
          "
          style={{
            fontFamily:
              "'SF Pro Display', 'Hiragino Sans', 'Noto Sans JP', sans-serif",
          }}
        >
          あ
        </span>

        <span
          className="
            absolute -bottom-16 -right-6
            text-[16rem] sm:text-[20rem]
            font-black leading-none
            text-slate-900/[0.04]
          "
          style={{
            fontFamily:
              "'SF Pro Display', 'Hiragino Sans', 'Noto Sans JP', sans-serif",
          }}
        >
          ア
        </span>

        {/* grid lines */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 w-px bg-slate-300/20"
            style={{ left: `${(i + 1) * 16}%` }}
          />
        ))}
      </div>

      {/* content */}
      <div className="relative z-10 w-full max-w-3xl flex flex-col items-center text-center">
        {/* badge */}
        <div
          className="
            mb-6

            inline-flex items-center gap-3

            rounded-full
            border border-white/30

            bg-white/35
            backdrop-blur-lg

            px-5 py-2.5

            shadow-[0_6px_24px_rgba(0,0,0,0.05)]
          "
        >
          <span className="text-lg text-slate-700">あ</span>

          <div className="h-4 w-px bg-slate-300/50" />

          <span className="text-lg text-slate-700">ア</span>
        </div>

        {/* hero card */}
        <div
          className="
            w-full

            rounded-[2rem]

            border border-white/30

            bg-white/40
            backdrop-blur-lg

            px-8 py-12 sm:px-14 sm:py-16

            shadow-[0_16px_50px_rgba(0,0,0,0.08)]
          "
        >
          {/* title */}
          <div className="flex flex-col items-center">
            <span className="mb-4 text-xs font-medium uppercase tracking-[0.45em] text-sky-500">
              Japanese Kana Practice
            </span>

            <h1
              className="
                text-6xl sm:text-7xl md:text-8xl
                font-semibold
                tracking-tight
                text-slate-900
              "
              style={{
                fontFamily:
                  "'SF Pro Display', 'Inter', 'Hiragino Sans', sans-serif",
              }}
            >
              DojoKana
            </h1>

            <div
              className="
                mt-5 h-px w-32
                bg-gradient-to-r
                from-transparent via-sky-300/50 to-transparent
              "
            />
          </div>

          {/* subtitle */}
          <p
            className="
              mx-auto mt-8 max-w-lg
              text-base sm:text-lg
              leading-relaxed
              text-slate-600
            "
          >
            Master Hiragana and Katakana through clean, interactive, and
            beautifully designed practice sessions.
          </p>

          {/* CTA */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            {/* primary */}
            <Link
              href="/practice/hiragana"
              className="
                flex-1

                rounded-2xl

                bg-slate-900
                text-white

                px-6 py-4

                text-center text-sm sm:text-base font-medium

                shadow-lg shadow-slate-900/20

                transition-all duration-300
                hover:scale-[1.02]
                hover:bg-slate-800

                active:scale-[0.98]
              "
            >
              Start Learning
            </Link>

            {/* secondary */}
            <Link
              href="/game"
              className="
                flex-1

                rounded-2xl

                border border-white/30

                bg-white/35
                backdrop-blur-lg

                px-6 py-4

                text-center text-sm sm:text-base font-medium
                text-slate-800

                shadow-[0_6px_18px_rgba(0,0,0,0.05)]

                transition-all duration-300
                hover:scale-[1.02]
                hover:bg-white/50

                active:scale-[0.98]
              "
            >
              Play Game
            </Link>
          </div>

          {/* pills */}
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {["Hiragana", "Katakana", "Kanji Soon"].map((item) => (
              <div
                key={item}
                className="
                  rounded-full

                  border border-white/30

                  bg-white/35
                  backdrop-blur-lg

                  px-4 py-2

                  text-xs
                  font-medium
                  uppercase
                  tracking-[0.24em]

                  text-slate-600

                  shadow-[0_2px_8px_rgba(0,0,0,0.04)]
                "
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* footer */}
        <p className="mt-8 text-xs uppercase tracking-[0.3em] text-slate-500">
          Learn Japanese beautifully
        </p>
      </div>

      {/* bottom line */}
      <div
        aria-hidden
        className="
          absolute bottom-0 left-0 right-0
          h-px
          bg-gradient-to-r
          from-transparent via-sky-300/40 to-transparent
        "
      />
    </main>
  );
}
