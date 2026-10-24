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
  metadataBase: new URL("https://www.pmiirayonhasyimasyari.my.id"),
  icons: {
    icon: "/favicon-square.png",
    shortcut: "/favicon-square.png",
    apple: "/favicon-square.png",
  },
  title: "PMII Rayon Hasyim Asyari - FST",
  description:
    "PMII Rayon Hasyim Asyari Fakultas Sains & Teknologi — Integrasi Spiritualitas & Inovasi. Dzikir, Fikir, Amal Sholeh.",
  keywords: ["PMII", "Rayon Hasyim Asyari", "FST", "Kaderisasi", "Sains", "Teknologi", "Islam"],
  openGraph: {
    title: "PMII Rayon Hasyim Asyari - FST",
    description:
      "PMII Rayon Hasyim Asyari Fakultas Sains & Teknologi — Integrasi Spiritualitas & Inovasi. Dzikir, Fikir, Amal Sholeh.",
    url: "https://www.pmiirayonhasyimasyari.my.id",
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
        {/* Preconnect untuk percepat load font */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Material Symbols — pakai display=block agar icon tidak flash sebagai teks */}
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block"
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
