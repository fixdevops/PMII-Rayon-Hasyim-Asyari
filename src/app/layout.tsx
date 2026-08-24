import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rayonhasyimasyari.vercel.app"),
  icons: {
    icon: "/logorayon.png",
    shortcut: "/logorayon.png",
    apple: "/logorayon.png",
  },
  title: "PMII Rayon Hasyim Asyari - FST",
  description:
    "PMII Rayon Hasyim Asyari Fakultas Sains & Teknologi — Integrasi Spiritualitas & Inovasi. Dzikir, Fikir, Amal Sholeh.",
  keywords: ["PMII", "Rayon Hasyim Asyari", "FST", "Kaderisasi", "Sains", "Teknologi", "Islam"],
  openGraph: {
    title: "PMII Rayon Hasyim Asyari - FST",
    description:
      "PMII Rayon Hasyim Asyari Fakultas Sains & Teknologi — Integrasi Spiritualitas & Inovasi. Dzikir, Fikir, Amal Sholeh.",
    url: "https://pmii-rayon-hasyim-asyari.vercel.app",
    siteName: "PMII Rayon Hasyim Asyari",
    images: [
      {
        url: "/logorayon.png",
        width: 1200,
        height: 630,
        alt: "Logo PMII Rayon Hasyim Asyari FST",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PMII Rayon Hasyim Asyari - FST",
    description:
      "PMII Rayon Hasyim Asyari Fakultas Sains & Teknologi — Integrasi Spiritualitas & Inovasi. Dzikir, Fikir, Amal Sholeh.",
    images: ["/logorayon.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={inter.variable} data-scroll-behavior="smooth">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&family=Bebas+Neue&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.cdnfonts.com/css/amanojaku"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased font-[family-name:var(--font-inter)]">
        {children}
      </body>
    </html>
  );
}
