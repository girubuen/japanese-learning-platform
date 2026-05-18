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
          className="
            group relative overflow-hidden rounded-3xl
            border border-slate-200/70
            bg-white/80
            p-6
            text-left
            shadow-[0_4px_20px_rgba(15,23,42,0.05)]
            backdrop-blur-xl
            transition-all duration-300 ease-out

            hover:-translate-y-1
            hover:border-slate-300
            hover:shadow-[0_12px_35px_rgba(15,23,42,0.10)]

            active:scale-[0.98]
          "
        >
          {/* subtle gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50 to-slate-100 opacity-80 transition-opacity duration-300 group-hover:opacity-100" />

          {/* top glow line */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent opacity-60" />

          {/* content */}
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Choice {index + 1}
              </span>

              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-500 transition-colors duration-300 group-hover:bg-slate-900 group-hover:text-white">
                {index + 1}
              </div>
            </div>

            <div className="mt-6 text-xl font-semibold tracking-tight text-slate-800">
              {option}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
