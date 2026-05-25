import Link from "next/link";
import KatakanaGrid from "../../components/practice/KatakanaGrid";

export default function KatakanaPage() {
  return (
    <main
      className="
        relative
        min-h-screen
        overflow-hidden

        bg-transparent

        flex
        flex-col
        items-center
      "
    >
      {/* ambient background */}
      <div
        aria-hidden
        className="
          absolute inset-0
          pointer-events-none
          overflow-hidden
        "
      >
        {/* cyan glow */}
        <div
          className="
            absolute -top-40 left-1/2 -translate-x-1/2
            w-[800px] h-[800px]
            rounded-full
            bg-sky-200/20
            blur-3xl
          "
        />

        {/* blue glow */}
        <div
          className="
            absolute bottom-0 right-0
            w-[500px] h-[500px]
            rounded-full
            bg-cyan-200/20
            blur-3xl
          "
        />

        {/* giant kana */}
        <span
          className="
            absolute
            -bottom-20
            -left-10

            text-[22rem]
            font-black
            leading-none

            text-slate-900/[0.03]
          "
          style={{
            fontFamily:
              "'SF Pro Display', 'Hiragino Sans', 'Noto Sans JP', sans-serif",
          }}
        >
          ア
        </span>

        {/* grid lines */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="
              absolute top-0 bottom-0 w-px
              bg-slate-300/20
            "
            style={{
              left: `${(i + 1) * 20}%`,
            }}
          />
        ))}
      </div>

      <div
        className="
          relative z-10
          w-full
          max-w-6xl
          px-5 sm:px-8
          py-10 sm:py-14

          flex
          flex-col
          items-center
          gap-10
        "
      >
        {/* top nav */}
        <div className="w-full flex items-center justify-between">
          {/* back button */}
          <Link
            href="/"
            className="
              group
              inline-flex
              items-center
              gap-2

              rounded-2xl
              border border-white/50

              bg-white/60
              backdrop-blur-xl

              px-4 py-2.5

              text-sm
              font-medium
              text-slate-700

              shadow-[0_4px_20px_rgba(0,0,0,0.05)]

              transition-all duration-200

              hover:bg-white/80
              hover:scale-[1.02]

              active:scale-[0.98]
            "
          >
            <span
              aria-hidden
              className="
                text-base
                transition-transform duration-200
                group-hover:-translate-x-0.5
              "
            >
              ←
            </span>
            Back
          </Link>

          {/* switcher */}
          <div
            className="
              flex items-center gap-2

              rounded-2xl
              border border-white/50

              bg-white/60
              backdrop-blur-xl

              p-1

              shadow-[0_4px_20px_rgba(0,0,0,0.05)]
            "
          >
            <Link
              href="/practice/hiragana"
              className="
                rounded-xl
                px-4 py-2

                text-sm
                font-medium
                text-slate-500

                transition-colors duration-200

                hover:text-slate-900
              "
            >
              Hiragana
            </Link>

            <Link
              href="/practice/katakana"
              className="
                rounded-xl
                bg-slate-900
                px-4 py-2

                text-sm
                font-medium
                text-white

                shadow-lg shadow-slate-900/10
              "
            >
              Katakana
            </Link>
          </div>
        </div>

        {/* hero */}
        <header className="flex flex-col items-center text-center">

          {/* main title */}
          <h1
            className="
              text-5xl sm:text-6xl md:text-7xl
              font-semibold
              tracking-tight
              text-sky-200
            "
            style={{
              fontFamily:
                "'SF Pro Display', 'Inter', 'Hiragino Sans', sans-serif",
            }}
          >
            カタカナ
          </h1>

          {/* subtitle */}
          <p
            className="
              mt-5
              max-w-xl

              text-base sm:text-lg
              leading-relaxed
              text-slate-500
            "
          >
            Learn to recognize and pronounce katakana characters through
            interactive visual practice.
          </p>

          {/* floating pill */}
          <div
            className="
              mt-6

              rounded-full
              border border-white/50

              bg-white/70
              backdrop-blur-xl

              px-4 py-2

              text-xs
              font-medium
              uppercase
              tracking-[0.24em]

              text-slate-500

              shadow-[0_4px_20px_rgba(0,0,0,0.05)]
            "
          >
            46 Basic Characters
          </div>
        </header>

        {/* grid */}
        <div className="w-full">
          <KatakanaGrid />
        </div>

        {/* footer */}
        <footer className="flex flex-col items-center gap-4 pt-2">
          <div
            className="
              h-px
              w-20
              bg-gradient-to-r
              from-transparent
              via-slate-300
              to-transparent
            "
          />

          <p
            className="
              text-xs
              uppercase
              tracking-[0.28em]
              text-slate-400
            "
          >
            Flashcards & quizzes coming soon
          </p>
        </footer>
      </div>

      {/* bottom accent */}
      <div
        aria-hidden
        className="
          absolute bottom-0 left-0 right-0
          h-px
          bg-gradient-to-r
          from-transparent
          via-sky-300/50
          to-transparent
        "
      />
    </main>
  );
}
