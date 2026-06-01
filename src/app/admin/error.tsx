"use client";

import { useEffect } from "react";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Admin panel error:", error);
  }, [error]);

  return (
    <div
      style={{
        padding: "60px 40px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "64px",
          height: "64px",
          borderRadius: "50%",
          background: "rgba(244, 63, 94, 0.12)",
          border: "1px solid rgba(244, 63, 94, 0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f43f5e" strokeWidth="2.5">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>

      <h2 style={{ color: "#ffffff", fontSize: "1.4rem", fontWeight: 700, margin: 0 }}>
        Bir hata oluştu
      </h2>
      <p style={{ color: "var(--text-muted)", maxWidth: "400px", lineHeight: 1.6 }}>
        Admin paneli yüklenirken beklenmeyen bir hata meydana geldi.
        {error.message && (
          <><br /><code style={{ fontSize: "0.8rem", opacity: 0.7 }}>{error.message}</code></>
        )}
      </p>

      <button
        onClick={reset}
        id="admin-error-retry-btn"
        style={{
          padding: "10px 28px",
          borderRadius: "9999px",
          border: "1px solid rgba(0, 229, 255, 0.4)",
          background: "rgba(0, 229, 255, 0.08)",
          color: "#ffffff",
          cursor: "pointer",
          fontSize: "0.95rem",
          fontWeight: 600,
        }}
      >
        Tekrar Dene
      </button>
    </div>
  );
}
