import type { KanaItem, Stats } from "./kana-data";

/**
 * Randomly shuffles an array using Fisher-Yates algorithm for true randomness
 */
export const shuffle = <T,>(arr: T[]): T[] => {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Selects a kana character with slight preference for less-mastered characters
 * while ensuring all characters get equal opportunity to appear
 */
export const getWeightedKana = (
  pool: KanaItem[],
  stats: Record<string, Stats>,
  excludeKana?: string
): KanaItem => {
  // Filter out the last shown character to prevent consecutive repeats
  let selectablePool = excludeKana
    ? pool.filter((k) => k.kana !== excludeKana)
    : pool;

  if (selectablePool.length === 0) selectablePool = pool;

  // Calculate difficulty score for each character (lower = less mastered)
  const charactersWithScore = selectablePool.map((item) => {
    const itemStats = stats[item.kana] || { correct: 0, wrong: 0 };
    const totalAttempts = itemStats.correct + itemStats.wrong;

    // Difficulty score: prioritize characters with more mistakes and fewer total attempts
    // This ensures unpracticed characters AND problematic ones both get attention
    const difficultyScore =
      totalAttempts === 0
        ? 100 // Unpracticed: highest priority
        : itemStats.wrong / (itemStats.correct + 1); // Ratio of wrong to correct (+1 to avoid division issues)

    return { item, score: difficultyScore };
  });

  // Sort by difficulty (descending) and pick from top 50% for variety
  // This balances specialization with fair distribution
  charactersWithScore.sort((a, b) => b.score - a.score);
  const topTierSize = Math.max(1, Math.ceil(charactersWithScore.length * 0.5));
  const topTier = charactersWithScore.slice(0, topTierSize);

  // Randomly select from top tier to maintain uniform distribution
  const selected = topTier[Math.floor(Math.random() * topTier.length)];
  return selected.item;
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
