// app/components/practice/KatakanaGrid.tsx

"use client";

import { useState } from "react";

type KanaEntry = {
  kana: string;
  romaji: string;
  group: string;
};

const KATAKANA_ROWS: KanaEntry[][] = [
  [
    { kana: "ア", romaji: "a", group: "a" },
    { kana: "イ", romaji: "i", group: "a" },
    { kana: "ウ", romaji: "u", group: "a" },
    { kana: "エ", romaji: "e", group: "a" },
    { kana: "オ", romaji: "o", group: "a" },
  ],
  [
    { kana: "カ", romaji: "ka", group: "ka" },
    { kana: "キ", romaji: "ki", group: "ka" },
    { kana: "ク", romaji: "ku", group: "ka" },
    { kana: "ケ", romaji: "ke", group: "ka" },
    { kana: "コ", romaji: "ko", group: "ka" },
  ],
  [
    { kana: "サ", romaji: "sa", group: "sa" },
    { kana: "シ", romaji: "shi", group: "sa" },
    { kana: "ス", romaji: "su", group: "sa" },
    { kana: "セ", romaji: "se", group: "sa" },
    { kana: "ソ", romaji: "so", group: "sa" },
  ],
  [
    { kana: "タ", romaji: "ta", group: "ta" },
    { kana: "チ", romaji: "chi", group: "ta" },
    { kana: "ツ", romaji: "tsu", group: "ta" },
    { kana: "テ", romaji: "te", group: "ta" },
    { kana: "ト", romaji: "to", group: "ta" },
  ],
  [
    { kana: "ナ", romaji: "na", group: "na" },
    { kana: "ニ", romaji: "ni", group: "na" },
    { kana: "ヌ", romaji: "nu", group: "na" },
    { kana: "ネ", romaji: "ne", group: "na" },
    { kana: "ノ", romaji: "no", group: "na" },
  ],
  [
    { kana: "ハ", romaji: "ha", group: "ha" },
    { kana: "ヒ", romaji: "hi", group: "ha" },
    { kana: "フ", romaji: "fu", group: "ha" },
    { kana: "ヘ", romaji: "he", group: "ha" },
    { kana: "ホ", romaji: "ho", group: "ha" },
  ],
  [
    { kana: "マ", romaji: "ma", group: "ma" },
    { kana: "ミ", romaji: "mi", group: "ma" },
    { kana: "ム", romaji: "mu", group: "ma" },
    { kana: "メ", romaji: "me", group: "ma" },
    { kana: "モ", romaji: "mo", group: "ma" },
  ],
  [
    { kana: "ヤ", romaji: "ya", group: "ya" },
    { kana: "", romaji: "", group: "ya" },
    { kana: "ユ", romaji: "yu", group: "ya" },
    { kana: "", romaji: "", group: "ya" },
    { kana: "ヨ", romaji: "yo", group: "ya" },
  ],
  [
    { kana: "ラ", romaji: "ra", group: "ra" },
    { kana: "リ", romaji: "ri", group: "ra" },
    { kana: "ル", romaji: "ru", group: "ra" },
    { kana: "レ", romaji: "re", group: "ra" },
    { kana: "ロ", romaji: "ro", group: "ra" },
  ],
  [
    { kana: "ワ", romaji: "wa", group: "wa" },
    { kana: "", romaji: "", group: "wa" },
    { kana: "", romaji: "", group: "wa" },
    { kana: "", romaji: "", group: "wa" },
    { kana: "ヲ", romaji: "wo", group: "wa" },
  ],
  [{ kana: "ン", romaji: "n", group: "n" }],
];

const KANA_LIST: KanaEntry[] = KATAKANA_ROWS.flat();

type KanaCardProps = {
  entry: KanaEntry;
  showRomaji: boolean;
  onClick: (romaji: string) => void;
};

function KanaCard({ entry, showRomaji, onClick }: KanaCardProps) {
  if (!entry.kana) {
    return <div className="aspect-square opacity-0 pointer-events-none" />;
  }

  return (
    <button
      aria-label={`${entry.kana} — ${entry.romaji}`}
      onClick={() => onClick(entry.romaji)}
      className="
        group
        relative
        aspect-square
        overflow-hidden
        rounded-3xl

        bg-white/70
        backdrop-blur-xl

        border border-white/40
        shadow-[0_4px_30px_rgba(0,0,0,0.06)]

        flex flex-col items-center justify-center

        transition-all duration-300 ease-out

        hover:scale-[1.04]
        hover:shadow-[0_10px_40px_rgba(0,0,0,0.12)]
        hover:bg-white/90
        cursor-pointer

        active:scale-[0.98]

        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-sky-400/60
      "
    >
      {/* subtle glow */}
      <div
        className="
          absolute inset-0
          bg-gradient-to-br
          from-white/60
          via-transparent
          to-sky-100/40
          opacity-70
        "
      />

      <span
        className="
          relative z-10
          text-4xl sm:text-5xl
          font-medium
          tracking-tight
          text-slate-800
          transition-transform duration-300
          group-hover:scale-110
        "
        style={{
          fontFamily:
            "'SF Pro Display', 'Hiragino Sans', 'Noto Sans JP', sans-serif",
        }}
      >
        {entry.kana}
      </span>

      <span
        className={`
          relative z-10
          mt-2
          text-[11px]
          uppercase
          tracking-[0.24em]
          text-slate-400
          transition-all duration-300
          ${
            showRomaji
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-1"
          }
        `}
      >
        {entry.romaji}
      </span>
    </button>
  );
}

function RowLabel({ label }: { label: string }) {
  return (
    <div className="col-span-full flex items-center gap-3 pt-2">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <span
        className="
          text-[10px]
          uppercase
          tracking-[0.35em]
          text-slate-400
          font-medium
        "
      >
        {label}
      </span>

      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
    </div>
  );
}

export default function KatakanaGrid() {
  const [showRomaji, setShowRomaji] = useState(false);

  const speakRomaji = (romaji: string) => {
    if ("speechSynthesis" in window) {
      speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(romaji);
      utterance.lang = "en-US";
      utterance.rate = 0.9;

      speechSynthesis.speak(utterance);
    }
  };

  return (
    <section
      className="
        relative
        w-full
        max-w-5xl
        mx-auto
        px-4
        py-8
      "
    >
      {/* background glow */}
      <div
        className="
          absolute inset-0 -z-10
          bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.10),transparent_40%)]
        "
      />

      {/* top bar */}
      <div
        className="
          mb-8
          flex items-center justify-between
          rounded-3xl
          border border-white/50
          bg-white/60
          backdrop-blur-xl
          px-5 py-4
          shadow-[0_8px_30px_rgba(0,0,0,0.06)]
        "
      >
        <div>
          <h2 className="text-xl font-semibold text-slate-800 tracking-tight">
            Katakana
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Tap a character to hear pronunciation
          </p>
        </div>

        <button
          onClick={() => setShowRomaji(!showRomaji)}
          className="
            rounded-2xl
            px-4 py-2.5

            bg-slate-900
            text-white
            text-sm
            font-medium

            transition-all duration-200

            hover:bg-slate-800
            hover:scale-[1.02]
            cursor-pointer

            active:scale-[0.98]

            shadow-lg shadow-slate-900/10
          "
        >
          {showRomaji ? "Hide Romaji" : "Show Romaji"}
        </button>
      </div>

      {/* grid */}
      <div
        className="
          grid
          grid-cols-3
          sm:grid-cols-4
          md:grid-cols-5
          gap-4 sm:gap-5
        "
      >
        {KATAKANA_ROWS.map((row) => {
          const { group } = row[0];

          return (
            <div key={group} className="contents">
              <RowLabel label={group} />

              {row.map((entry, i) => (
                <KanaCard
                  key={`${entry.romaji}-${i}`}
                  entry={entry}
                  showRomaji={showRomaji}
                  onClick={speakRomaji}
                />
              ))}
            </div>
          );
        })}
      </div>

      {/* footer */}
      <div className="mt-10 flex justify-center">
        <div
          className="
            rounded-full
            border border-white/50
            bg-white/60
            backdrop-blur-xl
            px-4 py-2

            text-xs
            tracking-[0.2em]
            uppercase
            text-slate-500

            shadow-[0_4px_20px_rgba(0,0,0,0.05)]
          "
        >
          {KANA_LIST.filter((k) => k.kana).length} Characters
        </div>
      </div>
    </section>
  );
}