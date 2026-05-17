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
    return <div className="aspect-square" />;
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

export default function KatakanaGrid() {
  const [showRomaji, setShowRomaji] = useState(false);

  const speakRomaji = (romaji: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(romaji);
      utterance.lang = "en-US";
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

      <p
        className="mt-6 text-center text-xs tracking-widest uppercase text-[#0D3A5F]/35"
        style={{ fontFamily: "Georgia, serif" }}
      >
        {KANA_LIST.filter((k) => k.kana).length} characters · Katakana
      </p>
    </section>
  );
}
