import { supabase } from "./supabaseClient";

export type UpdateProgressPayload = {
  userId: string;
  kanaType: "hiragana" | "katakana";
  character: string;
  correct: boolean;
};

/**
 * Updates user progress in local state (localStorage)
 */
export function updateLocalProgress(
  stats: Record<string, { correct: number; wrong: number }>,
  character: string,
  isCorrect: boolean
) {
  return {
    ...stats,
    [character]: {
      correct: (stats[character]?.correct || 0) + (isCorrect ? 1 : 0),
      wrong: (stats[character]?.wrong || 0) + (isCorrect ? 0 : 1),
    },
  };
}

/**
 * Syncs progress to Supabase database
 * Handles errors gracefully to keep game playable even if sync fails
 */
export async function syncProgressToSupabase({
  userId,
  kanaType,
  character,
  correct,
}: UpdateProgressPayload & { correct: boolean }) {
  try {
    // Fetch existing stats
    const { data: existing, error: selectError } = await supabase
      .from("user_progress")
      .select("correct, wrong")
      .eq("user_id", userId)
      .eq("character", character)
      .single();

    // PGRST116 = no rows found (expected on first attempt)
    if (selectError && selectError.code !== "PGRST116") {
      throw selectError;
    }

    // Calculate new stats
    const newCorrect = (existing?.correct || 0) + (correct ? 1 : 0);
    const newWrong = (existing?.wrong || 0) + (correct ? 0 : 1);
    const accuracy = Math.round(
      (newCorrect / (newCorrect + newWrong)) * 100
    );

    // Upsert to database
    const { error: upsertError } = await supabase
      .from("user_progress")
      .upsert({
        user_id: userId,
        kana_type: kanaType,
        character,
        correct: newCorrect,
        wrong: newWrong,
        status: accuracy >= 80 ? "mastered" : "learning",
        accuracy,
        updated_at: new Date().toISOString(),
      });

    if (upsertError) {
      console.warn(
        "⚠️ Failed to sync progress to Supabase (local stats saved):",
        upsertError
      );
    }
  } catch (error) {
    console.warn(
      "⚠️ Progress sync failed, using local storage only:",
      error
    );
  }
}