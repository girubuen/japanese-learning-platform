import type { KanaItem, Stats } from "./kana-data";

export const shuffle = <T,>(arr: T[]) => [...arr].sort(() => Math.random() - 0.5);

export const getWeightedKana = (pool: KanaItem[], stats: Record<string, Stats>) => {
  const weighted: KanaItem[] = [];

  pool.forEach((item) => {
    const itemStats = stats[item.kana] || { correct: 0, wrong: 0 };

    const weight = Math.max(1, itemStats.wrong * 3 - itemStats.correct + 1);

    for (let i = 0; i < weight; i++) {
      weighted.push(item);
    }
  });

  return weighted[Math.floor(Math.random() * weighted.length)];
};

export const speakKana = (text: string) => {
  try {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ja-JP";
    speechSynthesis.speak(utterance);
  } catch (e) {
    // silence failures in environments without TTS
  }
};
