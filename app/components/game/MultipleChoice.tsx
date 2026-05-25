"use client";

type Props = {
  options: string[];
  onSelect: (option: string) => void;
};

export default function MultipleChoice({ options, onSelect }: Props) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
      {options.map((option, index) => (
        <button
          key={option + index}
          onClick={() => onSelect(option)}
          className="
            group relative w-full

            rounded-2xl sm:rounded-3xl

            border border-white/30
            bg-white/40
            backdrop-blur-lg

            p-4 sm:p-6

            text-left

            text-slate-800

            shadow-[0_8px_24px_rgba(0,0,0,0.06)]

            transition-all duration-200 ease-out

            hover:bg-white/55
            hover:scale-[1.02]

            active:scale-[0.98]
          "
        >
          {/* subtle top highlight */}
          <div className="absolute inset-x-0 top-0 h-px bg-white/40 opacity-60" />

          {/* content */}
          <div className="relative z-10 flex items-center justify-between gap-4">
            {/* option text */}
            <span className="text-base sm:text-lg font-medium leading-snug text-slate-800">
              {option}
            </span>

            {/* index badge */}
            <span
              className="
                hidden sm:flex

                h-8 w-8
                items-center justify-center

                rounded-full

                bg-white/50
                border border-white/30

                text-sm font-medium
                text-slate-600

                transition-all duration-200

                group-hover:bg-slate-900
                group-hover:text-white
              "
            >
              {index + 1}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
}