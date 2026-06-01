import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Salev Tech | Premium Android Mobil Uygulamalar",
    template: "%s | Salev Tech"
  },
  description: "Salev Tech tarafından geliştirilen yenilikçi, yüksek performanslı ve güvenli Android uygulamalarını keşfedin. APK indirin veya uygulamalarımızı Google Play Store'da bulun.",
  keywords: [
    "Salev Tech", "Android uygulaması", "mobil uygulama indir",
    "Android Apps", "APK indir", "Google Play Store",
    "Türk Android geliştirici", "güvenli mobil uygulama",
    "Mobile Applications", "Android Developer Turkey"
  ],
  authors: [{ name: "Salih Tanrıseven", url: "https://salev.tech" }],
  metadataBase: new URL("https://salev.tech"),
  openGraph: {
    title: "Salev Tech | Premium Android Mobil Uygulamalar",
    description: "Salev Tech tarafından geliştirilen yenilikçi, yüksek performanslı ve güvenli Android uygulamalarını keşfedin.",
    url: "https://salev.tech",
    siteName: "Salev Tech",
    locale: "tr_TR",
    type: "website",
    images: [
      {
        url: "/banner.png",
        width: 1024,
        height: 500,
        alt: "Salev Tech — Premium Android Uygulamalar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Salev Tech | Premium Android Mobil Uygulamalar",
    description: "Salev Tech tarafından geliştirilen yenilikçi ve güvenli Android uygulamalarını keşfedin.",
    images: ["/banner.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${inter.variable} ${outfit.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
