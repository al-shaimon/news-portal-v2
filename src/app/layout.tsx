import type { Metadata } from "next";
import { Playfair_Display, Work_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["600", "700", "800"],
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "The Contemporary News",
  description:
    "Fast, bilingual news portal with clear hierarchy, powered by The Contemporary backoffice APIs.",
  openGraph: {
    title: "The Contemporary News",
    description:
      "Live headlines, analysis, and multimedia from The Contemporary newsroom.",
    url: "https://thecontemporary.news",
    siteName: "The Contemporary News",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Contemporary News",
    description: "Newsportal experience with a modern Material palette.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${workSans.variable} antialiased bg-[var(--color-surface)] text-[var(--color-ink)]`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
