"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Hata izleme servisi buraya entegre edilebilir (Sentry vb.)
    console.error("Application error:", error);
  }, [error]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "24px",
        padding: "40px 24px",
        textAlign: "center",
        background: "hsl(222, 28%, 7%)",
        color: "#ffffff",
        fontFamily: "sans-serif",
      }}
    >
      <h1
        style={{
          fontSize: "clamp(2rem, 6vw, 3.5rem)",
          fontWeight: 800,
          background: "linear-gradient(135deg, #f43f5e 0%, #ab47fa 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          margin: 0,
        }}
      >
        Beklenmeyen Hata
      </h1>

      <p style={{ color: "hsl(215, 16%, 70%)", maxWidth: "480px", lineHeight: 1.6, fontSize: "1.05rem" }}>
        Üzgünüz, bir şeyler ters gitti. Sayfayı yenilemeyi deneyin veya ana sayfaya dönün.
      </p>

      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}>
        <button
          onClick={reset}
          id="error-retry-btn"
          style={{
            padding: "12px 28px",
            borderRadius: "9999px",
            border: "1px solid rgba(0, 229, 255, 0.4)",
            background: "rgba(0, 229, 255, 0.1)",
            color: "#ffffff",
            cursor: "pointer",
            fontSize: "1rem",
            fontWeight: 600,
          }}
        >
          Tekrar Dene
        </button>
        <Link
          href="/"
          id="error-home-link"
          style={{
            padding: "12px 28px",
            borderRadius: "9999px",
            border: "1px solid rgba(255,255,255,0.1)",
            background: "rgba(255,255,255,0.05)",
            color: "#ffffff",
            fontSize: "1rem",
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          Ana Sayfaya Dön
        </Link>
      </div>
    </div>
  );
}
