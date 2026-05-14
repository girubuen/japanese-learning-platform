// app/components/KanaMatchingGame.tsx

"use client";

import { useState, useEffect } from "react";

// Combined hiragana and katakana data
const HIRAGANA = [
  { kana: "あ", romaji: "a" },
  { kana: "い", romaji: "i" },
  { kana: "う", romaji: "u" },
  { kana: "え", romaji: "e" },
  { kana: "お", romaji: "o" },
  { kana: "か", romaji: "ka" },
  { kana: "き", romaji: "ki" },
  { kana: "く", romaji: "ku" },
  { kana: "け", romaji: "ke" },
  { kana: "こ", romaji: "ko" },
  { kana: "さ", romaji: "sa" },
  { kana: "し", romaji: "shi" },
  { kana: "す", romaji: "su" },
  { kana: "せ", romaji: "se" },
  { kana: "そ", romaji: "so" },
  { kana: "た", romaji: "ta" },
  { kana: "ち", romaji: "chi" },
  { kana: "つ", romaji: "tsu" },
  { kana: "て", romaji: "te" },
  { kana: "と", romaji: "to" },
  { kana: "な", romaji: "na" },
  { kana: "に", romaji: "ni" },
  { kana: "ぬ", romaji: "nu" },
  { kana: "ね", romaji: "ne" },
  { kana: "の", romaji: "no" },
  { kana: "は", romaji: "ha" },
  { kana: "ひ", romaji: "hi" },
  { kana: "ふ", romaji: "fu" },
  { kana: "へ", romaji: "he" },
  { kana: "ほ", romaji: "ho" },
  { kana: "ま", romaji: "ma" },
  { kana: "み", romaji: "mi" },
  { kana: "む", romaji: "mu" },
  { kana: "め", romaji: "me" },
  { kana: "も", romaji: "mo" },
  { kana: "や", romaji: "ya" },
  { kana: "ゆ", romaji: "yu" },
  { kana: "よ", romaji: "yo" },
  { kana: "ら", romaji: "ra" },
  { kana: "り", romaji: "ri" },
  { kana: "る", romaji: "ru" },
  { kana: "れ", romaji: "re" },
  { kana: "ろ", romaji: "ro" },
  { kana: "わ", romaji: "wa" },
  { kana: "を", romaji: "wo" },
  { kana: "ん", romaji: "n" },
];

const KATAKANA = [
  { kana: "ア", romaji: "a" },
  { kana: "イ", romaji: "i" },
  { kana: "ウ", romaji: "u" },
  { kana: "エ", romaji: "e" },
  { kana: "オ", romaji: "o" },
  { kana: "カ", romaji: "ka" },
  { kana: "キ", romaji: "ki" },
  { kana: "ク", romaji: "ku" },
  { kana: "ケ", romaji: "ke" },
  { kana: "コ", romaji: "ko" },
  { kana: "サ", romaji: "sa" },
  { kana: "シ", romaji: "shi" },
  { kana: "ス", romaji: "su" },
  { kana: "セ", romaji: "se" },
  { kana: "ソ", romaji: "so" },
  { kana: "タ", romaji: "ta" },
  { kana: "チ", romaji: "chi" },
  { kana: "ツ", romaji: "tsu" },
  { kana: "テ", romaji: "te" },
  { kana: "ト", romaji: "to" },
  { kana: "ナ", romaji: "na" },
  { kana: "ニ", romaji: "ni" },
  { kana: "ヌ", romaji: "nu" },
  { kana: "ネ", romaji: "ne" },
  { kana: "ノ", romaji: "no" },
  { kana: "ハ", romaji: "ha" },
  { kana: "ヒ", romaji: "hi" },
  { kana: "フ", romaji: "fu" },
  { kana: "ヘ", romaji: "he" },
  { kana: "ホ", romaji: "ho" },
  { kana: "マ", romaji: "ma" },
  { kana: "ミ", romaji: "mi" },
  { kana: "ム", romaji: "mu" },
  { kana: "メ", romaji: "me" },
  { kana: "モ", romaji: "mo" },
  { kana: "ヤ", romaji: "ya" },
  { kana: "ユ", romaji: "yu" },
  { kana: "ヨ", romaji: "yo" },
  { kana: "ラ", romaji: "ra" },
  { kana: "リ", romaji: "ri" },
  { kana: "ル", romaji: "ru" },
  { kana: "レ", romaji: "re" },
  { kana: "ロ", romaji: "ro" },
  { kana: "ワ", romaji: "wa" },
  { kana: "ヲ", romaji: "wo" },
  { kana: "ン", romaji: "n" },
];

const ALL_KANA = [...HIRAGANA, ...KATAKANA];

export default function KanaMatchingGame() {
  const [currentKana, setCurrentKana] = useState(ALL_KANA[0]);
  const [options, setOptions] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [feedback, setFeedback] = useState("");

  const generateQuestion = () => {
    const randomKana = ALL_KANA[Math.floor(Math.random() * ALL_KANA.length)];
    setCurrentKana(randomKana);

    // Generate 4 options: 1 correct, 3 wrong
    const correct = randomKana.romaji;
    const wrongs = ALL_KANA.filter((k) => k.romaji !== correct)
      .map((k) => k.romaji)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    const allOptions = [correct, ...wrongs].sort(() => Math.random() - 0.5);
    setOptions(allOptions);
    setFeedback("");
  };

  useEffect(() => {
    generateQuestion();
  }, []);

  const handleAnswer = (selected: string) => {
    if (selected === currentKana.romaji) {
      setScore(score + 1);
      setStreak(streak + 1);
      setFeedback("Correct! 🎉");
    } else {
      setStreak(0);
      setFeedback(`Wrong! It's "${currentKana.romaji}"`);
    }
    setTimeout(generateQuestion, 1500);
  };

  return (
    <div className="w-full max-w-md mx-auto text-center">
      <div className="mb-6">
        <div
          className="text-6xl mb-4"
          style={{ fontFamily: "Georgia, 'Hiragino Mincho ProN', serif" }}
        >
          {currentKana.kana}
        </div>
        <p
          className="text-sm text-[#0D3A5F]/70"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Score: {score} | Streak: {streak}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => handleAnswer(option)}
            className="px-4 py-3 rounded-sm border-2 border-[#0D3A5F] text-sm tracking-wide text-[#0D3A5F] font-semibold transition-all duration-200 ease-out hover:bg-[#0D3A5F] hover:text-[#F4E7D3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D3A5F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4E7D3]"
            style={{ fontFamily: "Georgia, serif" }}
          >
            {option}
          </button>
        ))}
      </div>

      {feedback && (
        <p
          className={`text-sm font-semibold ${feedback.includes("Correct") ? "text-green-600" : "text-red-600"}`}
          style={{ fontFamily: "Georgia, serif" }}
        >
          {feedback}
        </p>
      )}
    </div>
  );
}
