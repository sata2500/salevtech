"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LegalDocument } from "@/data/legal";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import styles from "./LegalLayout.module.css";

interface LegalLayoutProps {
  document: LegalDocument;
}

export default function LegalLayout({ document }: LegalLayoutProps) {
  const pathname = usePathname();

  const links = [
    { label: "Gizlilik Politikası", href: "/privacy-policy" },
    { label: "Kullanım Koşulları", href: "/terms-of-service" },
    { label: "Çerez Politikası", href: "/cookie-policy" },
    { label: "KVKK & GDPR", href: "/gdpr" },
  ];

  return (
    <>
      <Header />
      <main className={styles.wrapper}>
        <div className="container">
          <div className={styles.grid}>
            {/* Sidebar menu */}
            <aside className={`${styles.sidebar} glass`}>
              <h2 className={styles.sidebarTitle}>Dökümanlar</h2>
              <ul className={styles.sidebarMenu}>
                {links.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={`${styles.sidebarLink} ${isActive ? styles.sidebarLinkActive : ""}`}
                        id={`legal-sidebar-link-${link.href.replace("/", "")}`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </aside>

            {/* Document Content Card */}
            <article className={`${styles.contentCard} glass`} id="legal-document-container">
              <div className={styles.titleArea}>
                <h1 className={styles.mainTitle}>{document.title}</h1>
                <p className={styles.meta} id="legal-last-updated">Son Güncelleme: {document.lastUpdated}</p>
              </div>

              <p className={styles.description}>{document.description}</p>

              {/* Sections rendering */}
              {document.sections.map((section, idx) => (
                <section key={idx} className={styles.section} id={`legal-section-${idx}`}>
                  <h2 className={styles.sectionTitle}>{section.title}</h2>
                  {section.content.map((p, pIdx) => (
                    <p key={pIdx} className={styles.paragraph}>
                      {p}
                    </p>
                  ))}
                </section>
              ))}
            </article>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
