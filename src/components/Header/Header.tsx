"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const menuItems = [
    { label: "Uygulamalar", href: "/#apps" },
    { label: "Hakkımızda", href: "/#about" },
    { label: "Gizlilik", href: "/privacy-policy" },
    { label: "İletişim", href: "/#contact" },
  ];

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.headerScrolled : ""}`}>
        <div className={styles.container}>
          <Link href="/" className={styles.logo} onClick={closeMobileMenu} id="nav-logo">
            <Image
              src="/logo.png"
              alt="Salev Tech Logo"
              width={36}
              height={36}
              className={styles.logoImage}
            />
            <span>salev.tech</span>
          </Link>

          {/* Desktop Nav */}
          <nav className={styles.nav}>
            {menuItems.map((item) => {
              const isActive = pathname === item.href || (item.href.startsWith("/#") && pathname === "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`${styles.navLink} ${isActive && pathname === item.href ? styles.navLinkActive : ""}`}
                  id={`nav-link-${item.label.toLowerCase()}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Hamburger Menu Button */}
          <button
            className={styles.menuButton}
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            id="mobile-menu-toggle"
          >
            <span className={`${styles.hamburger} ${mobileMenuOpen ? styles.hamburgerActive : ""}`}></span>
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`${styles.overlay} ${mobileMenuOpen ? styles.overlayActive : ""}`}
        onClick={closeMobileMenu}
      ></div>
      <nav className={`${styles.mobileNav} ${mobileMenuOpen ? styles.mobileNavActive : ""}`}>
        {menuItems.map((item) => {
          return (
            <Link
              key={item.href}
              href={item.href}
              className={styles.navLink}
              onClick={closeMobileMenu}
              id={`mobile-nav-link-${item.label.toLowerCase()}`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
