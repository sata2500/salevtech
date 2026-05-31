import Link from "next/link";
import { androidApps } from "@/data/apps";
import styles from "./Footer.module.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          {/* Brand Info */}
          <div className={styles.brandColumn}>
            <Link href="/" className={styles.logo}>
              <span>salev</span>
              <span className={styles.logoDot}></span>
              <span>tech</span>
            </Link>
            <p className={styles.brandDescription}>
              Modern, güvenli ve kullanıcı dostu Android uygulamaları üreterek mobil deneyiminizi zenginleştiriyoruz.
            </p>
          </div>

          {/* Apps Column */}
          <div className={styles.column}>
            <h4 className={styles.title}>Uygulamalarımız</h4>
            <div className={styles.links}>
              {androidApps.map((app) => (
                <Link
                  key={app.id}
                  href={`/apps/${app.slug}`}
                  className={styles.link}
                  id={`footer-app-${app.id}`}
                >
                  {app.title}
                </Link>
              ))}
            </div>
          </div>

          {/* Legal Column */}
          <div className={styles.column}>
            <h4 className={styles.title}>Yasal Sayfalar</h4>
            <div className={styles.links}>
              <Link href="/privacy-policy" className={styles.link} id="footer-link-privacy">
                Gizlilik Politikası
              </Link>
              <Link href="/terms-of-service" className={styles.link} id="footer-link-terms">
                Kullanım Koşulları
              </Link>
              <Link href="/cookie-policy" className={styles.link} id="footer-link-cookies">
                Çerez Politikası
              </Link>
              <Link href="/gdpr" className={styles.link} id="footer-link-gdpr">
                KVKK & GDPR Aydınlatma
              </Link>
            </div>
          </div>

          {/* Support / Contact Column */}
          <div className={styles.column}>
            <h4 className={styles.title}>İletişim</h4>
            <div className={styles.contactInfo}>
              <p>Sorularınız veya iş birlikleri için:</p>
              <a href="mailto:info@salev.tech" className={styles.emailLink} id="contact-email-link">
                info@salev.tech
              </a>
              <p>Destek talepleri:</p>
              <a href="mailto:support@salev.tech" className={styles.emailLink} id="support-email-link">
                support@salev.tech
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className={styles.bottom}>
          <p>© {currentYear} Salev Tech. Tüm Hakları Saklıdır.</p>
          <div className={styles.socials}>
            <a
              href="https://github.com/salev-tech"
              target="_blank"
              rel="noreferrer"
              className={styles.socialIcon}
              id="social-link-github"
            >
              GitHub
            </a>
            <a
              href="https://play.google.com/store/apps/developer?id=Salev+Tech"
              target="_blank"
              rel="noreferrer"
              className={styles.socialIcon}
              id="social-link-playstore"
            >
              Google Play
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
