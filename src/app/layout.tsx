import type { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "GNS 212 AI Teaching Assistant",
  description:
    "An AI-powered chatbot for GNS 212 students at the University of Ilorin",
};

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${merriweather.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--bg)] text-[var(--text-primary)]">
        {children}
      </body>
    </html>
  );
}
