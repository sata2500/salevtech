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
    default: "Salev Tech | Premium Android Apps Showcase",
    template: "%s | Salev Tech"
  },
  description: "Explore innovative, highly performant, and secure Android applications developed by Salev Tech. Directly download APKs or find our apps on the Google Play Store.",
  keywords: ["Salev Tech", "Android Apps", "Mobile Applications", "APK Download", "Google Play Store", "Android Developer"],
  authors: [{ name: "Salev Tech" }],
  metadataBase: new URL("https://salev.tech"),
  openGraph: {
    title: "Salev Tech | Premium Android Apps Showcase",
    description: "Explore innovative, highly performant, and secure Android applications developed by Salev Tech.",
    url: "https://salev.tech",
    siteName: "Salev Tech",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Salev Tech | Premium Android Apps Showcase",
    description: "Explore innovative, highly performant, and secure Android applications developed by Salev Tech.",
  },
  robots: {
    index: true,
    follow: true,
  }
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
