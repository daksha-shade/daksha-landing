import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Crimson_Text } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const crimsonText = Crimson_Text({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Daksha - Your Sacred Agentic AI Companion",
  description: "More than mental health. More than journaling. Welcome to the future of emotionally intelligent agents. Daksha is your personal AI companion that grows with you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${crimsonText.variable} antialiased font-inter`}
      >
        {children}
      </body>
    </html>
  );
}
