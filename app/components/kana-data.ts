export type KanaItem = {
  kana: string;
  romaji: string;
  type: "hiragana" | "katakana";
};

export const KANA: KanaItem[] = [
  { kana: "あ", romaji: "a", type: "hiragana" },
  { kana: "い", romaji: "i", type: "hiragana" },
  { kana: "う", romaji: "u", type: "hiragana" },
  { kana: "え", romaji: "e", type: "hiragana" },
  { kana: "お", romaji: "o", type: "hiragana" },

  { kana: "か", romaji: "ka", type: "hiragana" },
  { kana: "き", romaji: "ki", type: "hiragana" },
  { kana: "く", romaji: "ku", type: "hiragana" },
  { kana: "け", romaji: "ke", type: "hiragana" },
  { kana: "こ", romaji: "ko", type: "hiragana" },

  { kana: "さ", romaji: "sa", type: "hiragana" },
  { kana: "し", romaji: "shi", type: "hiragana" },
  { kana: "す", romaji: "su", type: "hiragana" },
  { kana: "せ", romaji: "se", type: "hiragana" },
  { kana: "そ", romaji: "so", type: "hiragana" },

  { kana: "ア", romaji: "a", type: "katakana" },
  { kana: "イ", romaji: "i", type: "katakana" },
  { kana: "ウ", romaji: "u", type: "katakana" },
  { kana: "エ", romaji: "e", type: "katakana" },
  { kana: "オ", romaji: "o", type: "katakana" },

  { kana: "カ", romaji: "ka", type: "katakana" },
  { kana: "キ", romaji: "ki", type: "katakana" },
  { kana: "ク", romaji: "ku", type: "katakana" },
  { kana: "ケ", romaji: "ke", type: "katakana" },
  { kana: "コ", romaji: "ko", type: "katakana" },

  { kana: "サ", romaji: "sa", type: "katakana" },
  { kana: "シ", romaji: "shi", type: "katakana" },
  { kana: "ス", romaji: "su", type: "katakana" },
  { kana: "セ", romaji: "se", type: "katakana" },
  { kana: "ソ", romaji: "so", type: "katakana" },
];

export type Mode = "all" | "hiragana" | "katakana";
export type GameMode = "Multiple Choices" | "Typing";

export type Stats = {
  correct: number;
  wrong: number;
};
