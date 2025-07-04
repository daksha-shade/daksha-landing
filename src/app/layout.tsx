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
  title: "Daksha - Your Mind, Organized. Your Life, Enhanced.",
  description: "Journaling-first, AI-powered life OS designed to store, reflect, and act - replacing apps like Notion, Google Photos, Drive, and ChatGPT with a single intuitive companion.",
  keywords: ["journaling", "AI", "productivity", "life OS", "personal assistant", "note taking", "memory", "reflection"],
  authors: [{ name: "Shaswat Raj" }],
  creator: "Daksha Team",
  publisher: "Daksha",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://daksha.live"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Daksha - Your Mind, Organized. Your Life, Enhanced.",
    description: "Journaling-first, AI-powered life OS designed to store, reflect, and act - replacing apps like Notion, Google Photos, Drive, and ChatGPT with a single intuitive companion.",
    url: "https://daksha.live",
    siteName: "Daksha",
    images: [
      {
        url: "/icon-512x512.png",
        width: 512,
        height: 512,
        alt: "Daksha Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Daksha - Your Mind, Organized. Your Life, Enhanced.",
    description: "Journaling-first, AI-powered life OS designed to store, reflect, and act - replacing apps like Notion, Google Photos, Drive, and ChatGPT with a single intuitive companion.",
    images: ["/icon-512x512.png"],
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "mask-icon", url: "/icon-192x192.png", color: "#2383e2" },
    ],
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Daksha",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#2383e2" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Daksha" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${crimsonText.variable} antialiased font-inter`}
      >
        {children}
      </body>
    </html>
  );
}