export type KanaItem = {
  kana: string;
  romaji: string;
  type: "hiragana" | "katakana";
};

// Complete basic hiragana and katakana sets (46 characters each)
const HIRAGANA: KanaItem[] = [
  // Vowels
  { kana: "あ", romaji: "a", type: "hiragana" },
  { kana: "い", romaji: "i", type: "hiragana" },
  { kana: "う", romaji: "u", type: "hiragana" },
  { kana: "え", romaji: "e", type: "hiragana" },
  { kana: "お", romaji: "o", type: "hiragana" },

  // K-line
  { kana: "か", romaji: "ka", type: "hiragana" },
  { kana: "き", romaji: "ki", type: "hiragana" },
  { kana: "く", romaji: "ku", type: "hiragana" },
  { kana: "け", romaji: "ke", type: "hiragana" },
  { kana: "こ", romaji: "ko", type: "hiragana" },

  // S-line
  { kana: "さ", romaji: "sa", type: "hiragana" },
  { kana: "し", romaji: "shi", type: "hiragana" },
  { kana: "す", romaji: "su", type: "hiragana" },
  { kana: "せ", romaji: "se", type: "hiragana" },
  { kana: "そ", romaji: "so", type: "hiragana" },

  // T-line
  { kana: "た", romaji: "ta", type: "hiragana" },
  { kana: "ち", romaji: "chi", type: "hiragana" },
  { kana: "つ", romaji: "tsu", type: "hiragana" },
  { kana: "て", romaji: "te", type: "hiragana" },
  { kana: "と", romaji: "to", type: "hiragana" },

  // N-line
  { kana: "な", romaji: "na", type: "hiragana" },
  { kana: "に", romaji: "ni", type: "hiragana" },
  { kana: "ぬ", romaji: "nu", type: "hiragana" },
  { kana: "ね", romaji: "ne", type: "hiragana" },
  { kana: "の", romaji: "no", type: "hiragana" },

  // H-line
  { kana: "は", romaji: "ha", type: "hiragana" },
  { kana: "ひ", romaji: "hi", type: "hiragana" },
  { kana: "ふ", romaji: "fu", type: "hiragana" },
  { kana: "へ", romaji: "he", type: "hiragana" },
  { kana: "ほ", romaji: "ho", type: "hiragana" },

  // M-line
  { kana: "ま", romaji: "ma", type: "hiragana" },
  { kana: "み", romaji: "mi", type: "hiragana" },
  { kana: "む", romaji: "mu", type: "hiragana" },
  { kana: "め", romaji: "me", type: "hiragana" },
  { kana: "も", romaji: "mo", type: "hiragana" },

  // Y-line
  { kana: "や", romaji: "ya", type: "hiragana" },
  { kana: "ゆ", romaji: "yu", type: "hiragana" },
  { kana: "よ", romaji: "yo", type: "hiragana" },

  // R-line
  { kana: "ら", romaji: "ra", type: "hiragana" },
  { kana: "り", romaji: "ri", type: "hiragana" },
  { kana: "る", romaji: "ru", type: "hiragana" },
  { kana: "れ", romaji: "re", type: "hiragana" },
  { kana: "ろ", romaji: "ro", type: "hiragana" },

  // W-line
  { kana: "わ", romaji: "wa", type: "hiragana" },
  { kana: "ゐ", romaji: "wi", type: "hiragana" },
  { kana: "ゑ", romaji: "we", type: "hiragana" },
  { kana: "を", romaji: "wo", type: "hiragana" },

  // N
  { kana: "ん", romaji: "n", type: "hiragana" },
];

const KATAKANA: KanaItem[] = [
  // Vowels
  { kana: "ア", romaji: "a", type: "katakana" },
  { kana: "イ", romaji: "i", type: "katakana" },
  { kana: "ウ", romaji: "u", type: "katakana" },
  { kana: "エ", romaji: "e", type: "katakana" },
  { kana: "オ", romaji: "o", type: "katakana" },

  // K-line
  { kana: "カ", romaji: "ka", type: "katakana" },
  { kana: "キ", romaji: "ki", type: "katakana" },
  { kana: "ク", romaji: "ku", type: "katakana" },
  { kana: "ケ", romaji: "ke", type: "katakana" },
  { kana: "コ", romaji: "ko", type: "katakana" },

  // S-line
  { kana: "サ", romaji: "sa", type: "katakana" },
  { kana: "シ", romaji: "shi", type: "katakana" },
  { kana: "ス", romaji: "su", type: "katakana" },
  { kana: "セ", romaji: "se", type: "katakana" },
  { kana: "ソ", romaji: "so", type: "katakana" },

  // T-line
  { kana: "タ", romaji: "ta", type: "katakana" },
  { kana: "チ", romaji: "chi", type: "katakana" },
  { kana: "ツ", romaji: "tsu", type: "katakana" },
  { kana: "テ", romaji: "te", type: "katakana" },
  { kana: "ト", romaji: "to", type: "katakana" },

  // N-line
  { kana: "ナ", romaji: "na", type: "katakana" },
  { kana: "ニ", romaji: "ni", type: "katakana" },
  { kana: "ヌ", romaji: "nu", type: "katakana" },
  { kana: "ネ", romaji: "ne", type: "katakana" },
  { kana: "ノ", romaji: "no", type: "katakana" },

  // H-line
  { kana: "ハ", romaji: "ha", type: "katakana" },
  { kana: "ヒ", romaji: "hi", type: "katakana" },
  { kana: "フ", romaji: "fu", type: "katakana" },
  { kana: "ヘ", romaji: "he", type: "katakana" },
  { kana: "ホ", romaji: "ho", type: "katakana" },

  // M-line
  { kana: "マ", romaji: "ma", type: "katakana" },
  { kana: "ミ", romaji: "mi", type: "katakana" },
  { kana: "ム", romaji: "mu", type: "katakana" },
  { kana: "メ", romaji: "me", type: "katakana" },
  { kana: "モ", romaji: "mo", type: "katakana" },

  // Y-line
  { kana: "ヤ", romaji: "ya", type: "katakana" },
  { kana: "ユ", romaji: "yu", type: "katakana" },
  { kana: "ヨ", romaji: "yo", type: "katakana" },

  // R-line
  { kana: "ラ", romaji: "ra", type: "katakana" },
  { kana: "リ", romaji: "ri", type: "katakana" },
  { kana: "ル", romaji: "ru", type: "katakana" },
  { kana: "レ", romaji: "re", type: "katakana" },
  { kana: "ロ", romaji: "ro", type: "katakana" },

  // W-line
  { kana: "ワ", romaji: "wa", type: "katakana" },
  { kana: "ヰ", romaji: "wi", type: "katakana" },
  { kana: "ヱ", romaji: "we", type: "katakana" },
  { kana: "ヲ", romaji: "wo", type: "katakana" },

  // N
  { kana: "ン", romaji: "n", type: "katakana" },
];

export const KANA: KanaItem[] = [...HIRAGANA, ...KATAKANA];

export type Mode = "all" | "hiragana" | "katakana";
export type GameMode = "Multiple Choices" | "Typing";

export type Stats = {
  correct: number;
  wrong: number;
};
