"use client";

type Props = {
  options: string[];
  onSelect: (option: string) => void;
};

export default function MultipleChoice({ options, onSelect }: Props) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {options.map((option, index) => (
        <button
          key={option + index}
          onClick={() => onSelect(option)}
          className="rounded-[1.5rem] border border-[#D9E2EC] bg-[#F8FAFC] px-5 py-6 text-left text-base font-semibold text-[#0D3A5F] transition hover:border-[#0D3A5F]/70 hover:bg-white"
        >
          <span className="text-sm text-[#0D3A5F]/80">Choice {index + 1}</span>
          <div className="mt-3 text-xl">{option}</div>
        </button>
      ))}
    </div>
  );
}
