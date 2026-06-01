import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,

  images: {
    // Harici kaynaklardan görsel yüklenirse buraya domain eklenebilir
    remotePatterns: [],
    formats: ["image/avif", "image/webp"],
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Clickjacking koruması
          { key: "X-Frame-Options", value: "DENY" },
          // MIME sniffing koruması
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Referrer bilgisi
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // XSS koruması (modern tarayıcılarda CSP daha etkili ama eski tarayıcılar için)
          { key: "X-XSS-Protection", value: "1; mode=block" },
          // HTTPS zorunluluğu (HSTS)
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          // İzinler politikası — gereksiz tarayıcı API erişimlerini engelle
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
