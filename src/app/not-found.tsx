import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <div className={styles.wrapper}>
      <div className="pulse-glow-purple" style={{ top: "20%", left: "20%" }}></div>
      <div className="pulse-glow-cyan" style={{ bottom: "20%", right: "20%" }}></div>

      <div className={styles.content}>
        <span className={styles.code}>404</span>
        <h1 className={styles.title}>Sayfa Bulunamadı</h1>
        <p className={styles.description}>
          Aradığınız sayfa kaldırılmış, taşınmış veya hiç var olmamış olabilir.
        </p>
        <Link href="/" className="btn-primary" id="not-found-home-link">
          Ana Sayfaya Dön
        </Link>
      </div>
    </div>
  );
}
