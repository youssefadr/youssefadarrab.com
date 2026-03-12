import type { Metadata } from "next";
import { Pixelify_Sans, Press_Start_2P } from "next/font/google";
import "./globals.css";

const pixelify = Pixelify_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-pixelify",
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
      "Software Engineer Backend — ML & AI. Paris.",
    url: "https://youssefadarrab.com",
    siteName: "Youssef Adarrab",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Youssef Adarrab",
    description:
      "Software Engineer Backend — ML & AI.",
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
      <body className={`${pixelify.variable} ${pressStart.variable}`}>
        {children}
      </body>
    </html>
  );
}
