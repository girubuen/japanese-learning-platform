"use client";

type Props = {
  options: string[];
  onSelect: (option: string) => void;
};

export default function MultipleChoice({ options, onSelect }: Props) {
  return (
    <div className="grid grid-cols-2 gap-3 mb-6">
      {options.map((option, index) => (
        <button
          key={option + index}
          onClick={() => onSelect(option)}
          className="border-2 border-[#0D3A5F] p-4 rounded hover:bg-[#0D3A5F] hover:text-[#F4E7D3] transition"
        >
          {index + 1}. {option}
        </button>
      ))}
    </div>
  );
}
