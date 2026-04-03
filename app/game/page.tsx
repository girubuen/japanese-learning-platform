import Link from "next/link";

export default function GameComingSoon() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6" style={{ backgroundColor: "#F4E7D3" }}>
      <h1 className="text-4xl sm:text-5xl font-black text-[#0D3A5F]" style={{ fontFamily: "Georgia, serif" }}>
        Play Game
      </h1>
      <p className="mt-4 text-lg sm:text-xl text-[#0D3A5F]/80 text-center max-w-sm" style={{ fontFamily: "Georgia, serif" }}>
        Coming soon - mati bangat cho bangsat ngapa terima kasih anjir 
      </p>
      <Link
        href="/"
        className="mt-8 px-6 py-3 rounded-sm text-[#F4E7D3] bg-[#0881A3] font-semibold tracking-wide transition-all duration-200 ease-out hover:bg-[#0D3A5F]"
        style={{ fontFamily: "Georgia, serif" }}
      >
        ← Back to Home
      </Link>
    </main>
  );
}