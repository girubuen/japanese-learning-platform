export default function KeyboardInfoTooltip() {
  return (
    <div className="relative inline-flex items-center group">
      {/* Icon */}
      <button
        type="button"
        aria-label="Keyboard shortcuts info"
        className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-[#0D3A5F] text-[#0D3A5F] font-bold hover:bg-[#0D3A5F] hover:text-[#F4E7D3] cursor-pointer transition"
      >
        i
      </button>

      {/* Tooltip */}
      <div className="absolute right-0 top-full mt-3 w-72 z-50 hidden translate-y-2 opacity-0 transition-all duration-200 origin-top-right group-hover:block group-hover:translate-y-0 group-hover:opacity-100 pointer-events-none">
        <div className="rounded-[1.25rem] border border-[#E2E8F0] bg-[#F8FAFC] p-5 shadow-xl text-left">
          <p className="font-semibold text-xs uppercase tracking-[0.25em] text-[#0D3A5F]/70 mb-3">
            Keyboard shortcuts
          </p>

          <ul className="space-y-1 text-[12px] text-[#0D3A5F]/80 normal-case tracking-normal">
            <li>1–4 → Select answer</li>
            <li>Enter → Submit typing</li>
            <li>H → Hiragana</li>
            <li>K → Katakana</li>
            <li>A → All</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
