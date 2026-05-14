// app/components/HiraganaGrid.tsx

"use client";

import { useState } from "react";

type KanaEntry = {
  kana: string;
  romaji: string;
  group: string;
};

const HIRAGANA_ROWS: KanaEntry[][] = [
  // a-row
  [
    { kana: "あ", romaji: "a", group: "a" },
    { kana: "い", romaji: "i", group: "a" },
    { kana: "う", romaji: "u", group: "a" },
    { kana: "え", romaji: "e", group: "a" },
    { kana: "お", romaji: "o", group: "a" },
  ],

  // ka-row
  [
    { kana: "か", romaji: "ka", group: "ka" },
    { kana: "き", romaji: "ki", group: "ka" },
    { kana: "く", romaji: "ku", group: "ka" },
    { kana: "け", romaji: "ke", group: "ka" },
    { kana: "こ", romaji: "ko", group: "ka" },
  ],

  // sa-row
  [
    { kana: "さ", romaji: "sa", group: "sa" },
    { kana: "し", romaji: "shi", group: "sa" },
    { kana: "す", romaji: "su", group: "sa" },
    { kana: "せ", romaji: "se", group: "sa" },
    { kana: "そ", romaji: "so", group: "sa" },
  ],

  // ta-row
  [
    { kana: "た", romaji: "ta", group: "ta" },
    { kana: "ち", romaji: "chi", group: "ta" },
    { kana: "つ", romaji: "tsu", group: "ta" },
    { kana: "て", romaji: "te", group: "ta" },
    { kana: "と", romaji: "to", group: "ta" },
  ],

  // na-row
  [
    { kana: "な", romaji: "na", group: "na" },
    { kana: "に", romaji: "ni", group: "na" },
    { kana: "ぬ", romaji: "nu", group: "na" },
    { kana: "ね", romaji: "ne", group: "na" },
    { kana: "の", romaji: "no", group: "na" },
  ],

  // ha-row
  [
    { kana: "は", romaji: "ha", group: "ha" },
    { kana: "ひ", romaji: "hi", group: "ha" },
    { kana: "ふ", romaji: "fu", group: "ha" },
    { kana: "へ", romaji: "he", group: "ha" },
    { kana: "ほ", romaji: "ho", group: "ha" },
  ],

  // ma-row
  [
    { kana: "ま", romaji: "ma", group: "ma" },
    { kana: "み", romaji: "mi", group: "ma" },
    { kana: "む", romaji: "mu", group: "ma" },
    { kana: "め", romaji: "me", group: "ma" },
    { kana: "も", romaji: "mo", group: "ma" },
  ],

  // ya-row (note gaps)
  [
    { kana: "や", romaji: "ya", group: "ya" },
    { kana: "", romaji: "", group: "ya" },
    { kana: "ゆ", romaji: "yu", group: "ya" },
    { kana: "", romaji: "", group: "ya" },
    { kana: "よ", romaji: "yo", group: "ya" },
  ],

  // ra-row
  [
    { kana: "ら", romaji: "ra", group: "ra" },
    { kana: "り", romaji: "ri", group: "ra" },
    { kana: "る", romaji: "ru", group: "ra" },
    { kana: "れ", romaji: "re", group: "ra" },
    { kana: "ろ", romaji: "ro", group: "ra" },
  ],

  // wa-row
  [
    { kana: "わ", romaji: "wa", group: "wa" },
    { kana: "", romaji: "", group: "wa" },
    { kana: "", romaji: "", group: "wa" },
    { kana: "", romaji: "", group: "wa" },
    { kana: "を", romaji: "wo", group: "wa" },
  ],

  // n
  [{ kana: "ん", romaji: "n", group: "n" }],
];

const KANA_LIST: KanaEntry[] = HIRAGANA_ROWS.flat();

type KanaCardProps = {
  entry: KanaEntry;
  showRomaji: boolean;
  onClick: (romaji: string) => void;
};

function KanaCard({ entry, showRomaji, onClick }: KanaCardProps) {
  if (!entry.kana) {
    return <div className="aspect-square" />; // empty slot spacing
  }

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`${entry.kana} — ${entry.romaji}`}
      onClick={() => onClick(entry.romaji)}
      className="
        group
        aspect-square
        flex flex-col items-center justify-center
        rounded-sm
        border border-[#0D3A5F]/20
        bg-[#F4E7D3]
        cursor-pointer
        select-none
        transition-all duration-200 ease-out
        hover:bg-[#0881A3]
        hover:border-[#0881A3]
        hover:scale-105
        hover:shadow-md
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-[#0881A3]
        focus-visible:ring-offset-2
        focus-visible:ring-offset-[#F4E7D3]
      "
    >
      <span
        className="
          text-3xl sm:text-4xl
          font-normal
          leading-none
          text-[#0D3A5F]
          group-hover:text-white
          transition-colors duration-200
        "
        style={{ fontFamily: "Georgia, 'Hiragino Mincho ProN', serif" }}
      >
        {entry.kana}
      </span>
      {showRomaji && (
        <span
          className="
            mt-1.5
            text-[10px] sm:text-xs
            tracking-widest
            uppercase
            text-[#0D3A5F]/50
            group-hover:text-white/70
            transition-colors duration-200
          "
          style={{ fontFamily: "Georgia, serif" }}
        >
          {entry.romaji}
        </span>
      )}
    </div>
  );
}

function RowLabel({ label }: { label: string }) {
  return (
    <div className="col-span-full flex items-center gap-3 mt-2 mb-0.5">
      <span
        className="text-xs uppercase tracking-[0.2em] text-[#0D3A5F]/40"
        style={{ fontFamily: "Georgia, serif" }}
      >
        {label}-row
      </span>
      <div className="flex-1 h-px bg-[#0D3A5F]/10" />
    </div>
  );
}

export default function HiraganaGrid() {
  const [showRomaji, setShowRomaji] = useState(false);

  const speakRomaji = (romaji: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(romaji);
      utterance.lang = "en-US"; // or 'ja-JP' for Japanese, but romaji is English
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <section className="w-full max-w-2xl mx-auto">
      <div className="mb-4 flex justify-center">
        <button
          onClick={() => setShowRomaji(!showRomaji)}
          className="px-4 py-2 rounded-sm border-2 border-[#0D3A5F] text-sm tracking-wide text-[#0D3A5F] font-semibold transition-all duration-200 ease-out hover:bg-[#0D3A5F] hover:text-[#F4E7D3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D3A5F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4E7D3]"
          style={{ fontFamily: "Georgia, serif" }}
        >
          {showRomaji ? "Hide Romaji" : "Show Romaji"}
        </button>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 sm:gap-4">
        {HIRAGANA_ROWS.map((row) => {
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

      <p
        className="mt-6 text-center text-xs tracking-widest uppercase text-[#0D3A5F]/35"
        style={{ fontFamily: "Georgia, serif" }}
      >
        {KANA_LIST.filter((k) => k.kana).length} characters · Hiragana
      </p>
    </section>
  );
}
