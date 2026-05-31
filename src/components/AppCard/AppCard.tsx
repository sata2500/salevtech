import Link from "next/link";
import { AndroidApp } from "@/data/apps";
import styles from "./AppCard.module.css";

interface AppCardProps {
  app: AndroidApp;
}

export default function AppCard({ app }: AppCardProps) {
  return (
    <div className={`${styles.card} glass-interactive`} id={`app-card-${app.id}`}>
      {/* Icon and Title Row */}
      <div className={styles.topRow}>
        <div
          className={styles.iconWrapper}
          style={{ background: app.iconGradient }}
        >
          <svg className={styles.icon} viewBox="0 0 24 24">
            <path d={app.iconSvg} />
          </svg>
        </div>
        <div className={styles.titleArea}>
          <span className={styles.category}>{app.category}</span>
          <h3 className={styles.title}>{app.title}</h3>
        </div>
      </div>

      {/* Description */}
      <p className={styles.description}>{app.description}</p>

      {/* Features bullet list */}
      <ul className={styles.featureList}>
        {app.features.slice(0, 3).map((feat, idx) => (
          <li key={idx} className={styles.featureItem}>
            <svg className={styles.checkIcon} viewBox="0 0 24 24">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>{feat}</span>
          </li>
        ))}
      </ul>

      {/* Action Buttons */}
      <div className={styles.actions}>
        <Link
          href={`/apps/${app.slug}`}
          className={styles.btnDetails}
          id={`app-card-details-link-${app.id}`}
        >
          Detayları İncele
        </Link>
        <a
          href={app.playStoreUrl}
          target="_blank"
          rel="noreferrer"
          className={styles.btnPlayStore}
          title="Google Play Store'da Görüntüle"
          aria-label={`${app.title} Google Play Link`}
          id={`app-card-playstore-link-${app.id}`}
        >
          <svg className={styles.playStoreIcon} viewBox="0 0 24 24">
            <path d="M3 5.25v13.5c0 1.2.9 1.95 1.95 1.95.45 0 .9-.15 1.2-.45L17.7 12 6.15 3.75c-.3-.3-.75-.45-1.2-.45C3.9 3.3 3 4.05 3 5.25zM19.35 11l-3.3 2.4 2.85 2.1c.45.3 1.05.3 1.5-.15.45-.45.45-1.05.15-1.5L19.35 11z" />
          </svg>
        </a>
      </div>
    </div>
  );
}
