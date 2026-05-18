"use client";

type Props = {
  typingAnswer: string;
  setTypingAnswer: (s: string) => void;
  onSubmit: () => void;
};

export default function TypingMode({
  typingAnswer,
  setTypingAnswer,
  onSubmit,
}: Props) {
  return (
    <div className="space-y-4">
      <input
        value={typingAnswer}
        onChange={(e) => setTypingAnswer(e.target.value)}
        placeholder="Type romaji..."
        className="w-full rounded-[1.5rem] border border-[#D9E2EC] bg-[#F8FAFC] px-5 py-4 text-center text-lg text-[#0D3A5F] outline-none transition focus:border-[#0D3A5F]"
      />

      <button
        onClick={onSubmit}
        className="cursor-pointer w-full rounded-full bg-[#0D3A5F] px-6 py-4 text-base font-semibold text-[#F4E7D3] transition hover:bg-[#492A76]"
      >
        Submit
      </button>
    </div>
  );
}
