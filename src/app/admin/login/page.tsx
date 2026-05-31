"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Geçersiz e-posta adresi veya şifre!");
        setLoading(false);
      } else {
        router.push("/admin");
        router.refresh();
      }
    } catch (err) {
      console.error(err);
      setError("Giriş yapılırken beklenmedik bir hata oluştu.");
      setLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      {/* Decorative Glow Backgrounds */}
      <div className="pulse-glow-purple" style={{ top: "30%", left: "30%", transform: "translate(-50%, -50%)" }}></div>
      <div className="pulse-glow-cyan" style={{ bottom: "30%", right: "30%", transform: "translate(50%, 50%)" }}></div>

      <div className={`${styles.card} glass`}>
        <div className={styles.header}>
          <h1 className={styles.title}>Admin Girişi</h1>
          <p className={styles.subtitle}>salev.tech yönetim paneline erişin</p>
        </div>

        {error && <div className={styles.error} id="login-error-msg">{error}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="login-email" className={styles.label}>
              E-posta Adresi
            </label>
            <input
              type="email"
              id="login-email"
              required
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@salev.tech"
              disabled={loading}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="login-password" className={styles.label}>
              Şifre
            </label>
            <input
              type="password"
              id="login-password"
              required
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={styles.submitBtn}
            id="login-submit-btn"
          >
            {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
          </button>
        </form>
      </div>
    </div>
  );
}
