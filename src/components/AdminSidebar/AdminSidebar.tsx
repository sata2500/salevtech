"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import styles from "@/app/admin/(dashboard)/layout.module.css";

interface AdminSidebarProps {
  userName: string;
}

export default function AdminSidebar({ userName }: AdminSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  const links = [
    { label: "Genel Bakış", href: "/admin" },
    { label: "Uygulamalar", href: "/admin/apps" },
    { label: "Slaytlar / Duyurular", href: "/admin/slides" },
    { label: "Gelen Mesajlar", href: "/admin/messages" },
  ];

  return (
    <>
      {/* Mobile Top Header */}
      <div className={styles.mobileHeader}>
        <Link href="/" className={styles.logoArea}>
          <Image src="/logo.png" alt="Logo" width={28} height={28} style={{ borderRadius: "6px" }} />
          <span className={styles.logoTitle}>salev.tech</span>
        </Link>
        <button className={styles.mobileMenuBtn} onClick={toggleSidebar} aria-label="Menu toggle">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </div>

      {/* Backdrop overlay for mobile drawer */}
      <div
        className={`${styles.overlay} ${isOpen ? styles.overlayActive : ""}`}
        onClick={closeSidebar}
      ></div>

      {/* Sidebar navigation */}
      <aside className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ""}`}>
        <Link href="/" className={styles.logoArea} onClick={closeSidebar}>
          <Image src="/logo.png" alt="Logo" width={32} height={32} style={{ borderRadius: "8px" }} />
          <span className={styles.logoTitle}>salev.tech admin</span>
        </Link>

        <nav className={styles.menu}>
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`${styles.menuLink} ${isActive ? styles.menuLinkActive : ""}`}
                  onClick={closeSidebar}
                  id={`admin-menu-link-${link.label.toLowerCase().replace(/ /g, "-")}`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </nav>

        {/* Footer Logout info */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div style={{ fontSize: "0.85rem", color: "var(--text-dim)", paddingLeft: "16px" }}>
            Giriş yapan: <strong>{userName}</strong>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className={styles.logoutBtn}
            id="admin-logout-btn"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            <span>Çıkış Yap</span>
          </button>
        </div>
      </aside>
    </>
  );
}
