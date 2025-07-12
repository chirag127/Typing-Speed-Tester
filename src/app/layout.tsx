import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "TypingSpeed Tester - Test Your Typing Speed & Accuracy",
  description: "A comprehensive typing speed tester with customizable paragraphs, WPM tracking, accuracy measurement, and leaderboard functionality. Improve your typing skills with tech, casual, and random content.",
  keywords: ["typing test", "typing speed", "WPM", "words per minute", "typing accuracy", "keyboard skills", "typing practice"],
  authors: [{ name: "Chirag Singhal", url: "https://github.com/chirag127" }],
  creator: "Chirag Singhal",
  publisher: "Chirag Singhal",
  robots: "index, follow",
  openGraph: {
    title: "TypingSpeed Tester - Test Your Typing Speed & Accuracy",
    description: "Test your typing speed with customizable paragraphs and track your progress with detailed statistics.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "TypingSpeed Tester",
    description: "Test your typing speed with customizable paragraphs and track your progress.",
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#3b82f6",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
