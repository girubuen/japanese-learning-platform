import Link from "next/link";
import KatakanaGrid from "../../components/KatakanaGrid";

export default function KatakanaPage() {
  return (
    <main
      className="min-h-screen flex flex-col items-center relative overflow-hidden"
      style={{ backgroundColor: "#F4E7D3" }}
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none select-none overflow-hidden"
      >
        <span
          className="absolute -bottom-16 -left-10 text-[20rem] font-black leading-none opacity-[0.035]"
          style={{ color: "#0D3A5F", fontFamily: "serif" }}
        >
          習
        </span>
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 w-px opacity-[0.07]"
            style={{
              left: `${(i + 1) * 20}%`,
              backgroundColor: "#0D3A5F",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-3xl px-6 py-14 flex flex-col items-center gap-10">
        {/* Back Button */}
        <div className="w-full flex items-center justify-start">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm border-2 border-[#0D3A5F] text-sm tracking-wide text-[#0D3A5F] font-semibold transition-all duration-200 ease-out hover:bg-[#0D3A5F] hover:text-[#F4E7D3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D3A5F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4E7D3]"
            style={{ fontFamily: "Georgia, serif" }}
          >
            <span aria-hidden className="text-base leading-none">
              ←
            </span>{" "}
            Back
          </Link>
        </div>

        {/* Header */}
        <header className="flex flex-col items-center text-center gap-3">
          <div
            className="text-xl tracking-widest font-light mb-1"
            style={{ color: "#0881A3", fontFamily: "serif" }}
            aria-hidden
          >
            カタカナ
          </div>
          <h1
            className="text-4xl sm:text-5xl font-black tracking-tight leading-none text-[#0D3A5F]"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            Practice Katakana
          </h1>
          <div className="relative w-32 h-[3px] mt-1" aria-hidden>
            <div className="absolute inset-0 rounded-full bg-[#0881A3]" />
            <div className="absolute right-0 top-0 h-full w-1/3 rounded-full bg-[#0D3A5F] opacity-40" />
          </div>
          <p
            className="mt-3 text-base sm:text-lg font-light text-[#0D3A5F]/70 max-w-sm leading-relaxed"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Start recognising characters visually.
          </p>
        </header>

        {/* 🔽 Kana Switcher (ADDED HERE) */}
        <div className="flex justify-center gap-4 -mt-4">
          <Link
            href="/practice/hiragana"
            className="px-4 py-2 text-sm font-semibold rounded-sm border"
            style={{ backgroundColor: "#F4E7D3", color: "#0D3A5F" }}
          >
            Hiragana
          </Link>

          <Link
            href="/practice/katakana"
            className="px-4 py-2 text-sm font-semibold rounded-sm"
            style={{ backgroundColor: "#0881A3", color: "#F4E7D3" }}
          >
            Katakana
          </Link>
        </div>

        {/* Grid */}
        <KatakanaGrid />

        {/* Footer note */}
        <div className="flex flex-col items-center gap-3 pt-4 opacity-50">
          <div className="w-16 h-px bg-[#0D3A5F]" />
          <p
            className="text-xs tracking-widest uppercase text-[#0D3A5F]"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Flashcards &amp; quizzes coming soon
          </p>
        </div>
      </div>

      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-1 opacity-60"
        style={{ backgroundColor: "#0881A3" }}
      />
    </main>
  );
}