import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Press_Start_2P } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

const pressStart = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel",
});

export const metadata: Metadata = {
  title: "Youssef Adarrab — Software Engineer Backend, ML & AI",
  description:
    "Software Engineer Backend — ML & AI. Research, publications, and technical writing.",
  openGraph: {
    title: "Youssef Adarrab",
    description:
      "AI Researcher & Engineer. Research, projects, and writing.",
    url: "https://youssefadarrab.com",
    siteName: "Youssef Adarrab",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Youssef Adarrab",
    description:
      "AI Researcher & Engineer. Research, projects, and writing.",
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jetbrains.variable} ${pressStart.variable}`}>
        {children}
      </body>
    </html>
  );
}
