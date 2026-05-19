import { supabase } from "./supabaseClient";

export async function saveKanaProgress({
  userId,
  kanaType,
  character,
  isCorrect,
}: {
  userId: string;
  kanaType: "hiragana" | "katakana";
  character: string;
  isCorrect: boolean;
}) {
  const { error } = await supabase.from("user_progress").upsert({
    user_id: userId,
    kana_type: kanaType,
    character,
    status: isCorrect ? "mastered" : "learning",
    accuracy: isCorrect ? 100 : 0,
    updated_at: new Date().toISOString(),
  });

  if (error) {
    console.error("Supabase save error:", error);
  }
}