// app/layout.tsx
import "./globals.css"; // optional: your Tailwind globals

export const metadata = {
  title: "DojoKana",
  description: "Master Hiragana and Katakana the right way",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#F4E7D3] text-[#0D3A5F] font-sans min-h-screen">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="bg-video"
          aria-hidden="true"
        >
          <source src="/tori.mp4" type="video/mp4" />
        </video>
        <div className="bg-overlay" aria-hidden="true" />
        <main className="app-content">{children}</main>
      </body>
    </html>
  );
}
