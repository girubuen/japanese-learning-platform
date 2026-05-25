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
      {/* input */}
      <input
        value={typingAnswer}
        onChange={(e) => setTypingAnswer(e.target.value)}
        placeholder="Type romaji..."
        className="
          w-full

          rounded-2xl

          border border-white/30
          bg-white/40
          backdrop-blur-lg

          px-5 py-4

          text-center text-lg
          text-slate-800

          outline-none

          transition-all duration-200

          placeholder:text-slate-400

          focus:bg-white/55
          focus:border-white/50
          focus:ring-2
          focus:ring-sky-200/40
        "
        style={{
          fontFamily: "'SF Pro Display', 'Inter', 'Hiragino Sans', sans-serif",
        }}
      />

      {/* button */}
      <button
        onClick={onSubmit}
        className="
          w-full

          rounded-2xl

          bg-slate-900
          text-white

          px-6 py-4

          text-base font-medium

          shadow-[0_10px_30px_rgba(15,23,42,0.25)]

          transition-all duration-200

          hover:bg-slate-800
          hover:scale-[1.02]

          active:scale-[0.98]
        "
      >
        Submit
      </button>
    </div>
  );
}
