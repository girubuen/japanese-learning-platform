// app/layout.tsx
import "./globals.css"; // optional: your Tailwind globals

export const metadata = {
  title: "DojoKana",
  description: "Master Hiragana and Katakana the right way",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#F4E7D3] text-[#0D3A5F] font-sans">
        {children}
      </body>
    </html>
  );
}