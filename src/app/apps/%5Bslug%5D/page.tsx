import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { androidApps } from "@/data/apps";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import styles from "./page.module.css";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return androidApps.map((app) => ({
    slug: app.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const app = androidApps.find((a) => a.slug === slug);
  if (!app) return {};

  return {
    title: `${app.title} - Android Mobil Uygulaması`,
    description: app.description,
    openGraph: {
      title: `${app.title} | Salev Tech`,
      description: app.description,
      url: `https://salev.tech/apps/${app.slug}`,
    }
  };
}

export default async function AppPage({ params }: PageProps) {
  const { slug } = await params;
  const app = androidApps.find((a) => a.slug === slug);

  if (!app) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className={styles.wrapper}>
        <div className="container">
          {/* Back to Home Link */}
          <Link href="/#apps" className={styles.backLink} id="app-detail-back-link">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            <span>Uygulamalara Dön</span>
          </Link>

          {/* Page Hero */}
          <section className={styles.hero}>
            <div
              className={styles.iconWrapper}
              style={{ background: app.iconGradient }}
              id="app-detail-icon"
            >
              <svg className={styles.icon} viewBox="0 0 24 24">
                <path d={app.iconSvg} />
              </svg>
            </div>
            <div className={styles.titleArea}>
              <span className={styles.category}>{app.category}</span>
              <h1 className={styles.title} id="app-detail-title">{app.title}</h1>
              <p className={styles.tagline}>{app.tagline}</p>
            </div>
          </section>

          {/* Grid Layout */}
          <div className={styles.grid}>
            {/* Left Content Column */}
            <div className={styles.leftColumn}>
              {/* About Card */}
              <div className={`${styles.aboutCard} glass`}>
                <h2 className={styles.cardTitle}>Uygulama Hakkında</h2>
                <p className={styles.longDescription}>{app.longDescription}</p>

                <h3 className={styles.cardTitle} style={{ borderBottom: "none", marginTop: "24px" }}>Öne Çıkan Özellikler</h3>
                <div className={styles.featuresGrid}>
                  {app.features.map((feat, idx) => (
                    <div key={idx} className={styles.featureItem} id={`app-feature-item-${idx}`}>
                      <svg className={styles.checkIcon} viewBox="0 0 24 24">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Specs Card */}
              <div className={`${styles.specsCard} glass`} id="app-specs-container">
                <h2 className={styles.cardTitle}>Teknik Detaylar</h2>
                <div className={styles.specList}>
                  <div className={styles.specRow}>
                    <span className={styles.specLabel}>Minimum Android Sürümü</span>
                    <span className={styles.specValue} id="spec-minsdk">{app.specs.minSdk}</span>
                  </div>
                  <div className={styles.specRow}>
                    <span className={styles.specLabel}>Hedeflenen Android Sürümü</span>
                    <span className={styles.specValue} id="spec-targetsdk">{app.specs.targetSdk}</span>
                  </div>
                  <div className={styles.specRow}>
                    <span className={styles.specLabel}>Desteklenen Mimariler</span>
                    <span className={styles.specValue} id="spec-architecture">{app.specs.architecture}</span>
                  </div>
                  <div className={styles.specRow} style={{ borderBottom: "none", flexDirection: "column", gap: "10px", alignItems: "flex-start" }}>
                    <span className={styles.specLabel}>Gerekli İzinler</span>
                    <div style={{ flexWrap: "wrap", marginTop: "4px" }} id="spec-permissions">
                      {app.specs.permissions.map((perm) => (
                        <span key={perm} className={styles.permissionTag}>
                          {perm}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Changelog Timeline Card */}
              <div className={`${styles.changelogCard} glass`} id="app-changelog-container">
                <h2 className={styles.cardTitle}>Sürüm Geçmişi</h2>
                <div className={styles.timeline}>
                  {app.changelog.map((log) => (
                    <div key={log.version} className={styles.timelineItem} id={`changelog-item-${log.version.replace(/\./g, "-")}`}>
                      <span className={styles.timelineDot}></span>
                      <div className={styles.timelineHeader}>
                        <h3 className={styles.timelineVersion}>v{log.version}</h3>
                        <span className={styles.timelineDate}>{log.date}</span>
                      </div>
                      <ul className={styles.timelineNotes}>
                        {log.notes.map((note, idx) => (
                          <li key={idx} className={styles.timelineNote}>
                            {note}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Download Column */}
            <aside>
              <div className={`${styles.downloadCard} glass`} id="app-download-sidebar">
                <div className={styles.downloadHeader}>
                  <h3 className={styles.downloadTitle}>Hemen İndir</h3>
                </div>

                <div className={styles.downloadMeta}>
                  <div className={styles.metaRow}>
                    <span>Sürüm:</span>
                    <strong id="download-version">{app.version}</strong>
                  </div>
                  <div className={styles.metaRow}>
                    <span>Boyut:</span>
                    <strong id="download-size">{app.size}</strong>
                  </div>
                  <div className={styles.metaRow}>
                    <span>Son Güncelleme:</span>
                    <strong id="download-date">{app.releaseDate}</strong>
                  </div>
                </div>

                <a
                  href={app.playStoreUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.btnDownloadPlay}
                  id="btn-playstore"
                >
                  <svg className={styles.downloadIcon} viewBox="0 0 24 24">
                    <path d="M3 5.25v13.5c0 1.2.9 1.95 1.95 1.95.45 0 .9-.15 1.2-.45L17.7 12 6.15 3.75c-.3-.3-.75-.45-1.2-.45C3.9 3.3 3 4.05 3 5.25zM19.35 11l-3.3 2.4 2.85 2.1c.45.3 1.05.3 1.5-.15.45-.45.45-1.05.15-1.5L19.35 11z" />
                  </svg>
                  <span>Google Play&apos;den İndir</span>
                </a>

                <a
                  href={app.apkUrl}
                  className={styles.btnDownloadApk}
                  id="btn-apk"
                >
                  <svg className={styles.downloadIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                  <span>Direkt APK İndir</span>
                </a>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
