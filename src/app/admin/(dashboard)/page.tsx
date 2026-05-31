import Link from "next/link";
import prisma from "@/lib/prisma";
import styles from "./dashboard.module.css";

export default async function AdminDashboardOverview() {
  let appCount = 0;
  let slideCount = 0;
  let messageCount = 0;
  let unreadMessageCount = 0;
  let recentMessages: any[] = [];
  let dbError = false;

  try {
    appCount = await prisma.androidApp.count();
    slideCount = await prisma.promoSlide.count();
    messageCount = await prisma.contactMessage.count();
    unreadMessageCount = await prisma.contactMessage.count({
      where: { read: false },
    });
    recentMessages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    });
  } catch (error) {
    console.error("Database loading error:", error);
    dbError = true;
  }

  return (
    <div>
      {/* Page Header */}
      <div className={styles.pageHeader}>
        <div className={styles.titleArea}>
          <h1 className={styles.pageTitle} id="admin-overview-title">Genel Bakış</h1>
          <p className={styles.pageSubtitle}>salev.tech yönetim paneli özet verileri</p>
        </div>
      </div>

      {dbError ? (
        <div className="glass" style={{ padding: "40px", borderLeft: "4px solid var(--color-accent)" }} id="db-migration-warning">
          <h2 style={{ fontSize: "1.4rem", fontWeight: "700", marginBottom: "16px", color: "#ffffff" }}>
            Veritabanı Yapılandırması Eksik!
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: "1.6", marginBottom: "20px" }}>
            Veritabanı tablolarınız henüz oluşturulmamış veya veritabanı bağlantınız kurulamamış olabilir. 
            Lütfen terminalinizde aşağıdaki adımları tamamladığınızdan emin olun:
          </p>
          <pre style={{ background: "rgba(0,0,0,0.4)", padding: "16px", borderRadius: "8px", fontFamily: "monospace", fontSize: "0.9rem", color: "var(--color-primary)", overflowX: "auto" }}>
            # 1. Tabloları veritabanında oluşturun:<br />
            npx prisma db push<br /><br />
            # 2. Örnek uygulama ve admin verilerini tohumlayın:<br />
            npx prisma db seed
          </pre>
          <p style={{ color: "var(--text-dim)", fontSize: "0.85rem", marginTop: "16px" }}>
            Not: Vercel üzerindeyseniz, `DATABASE_URL` değişkeninin Vercel Dashboard ayarlarında tanımlanmış olması gerekmektedir.
          </p>
        </div>
      ) : (
        <>
          {/* Metrics Grid */}
          <div className={styles.grid}>
            {/* Apps Card */}
            <div className={`${styles.metricCard} glass`} id="metric-card-apps">
              <div className={styles.metricInfo}>
                <span className={styles.metricLabel}>Mobil Uygulamalar</span>
                <strong className={styles.metricValue}>{appCount}</strong>
              </div>
              <div className={styles.metricIcon}>
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
            </div>

            {/* Slides Card */}
            <div className={`${styles.metricCard} glass`} id="metric-card-slides">
              <div className={styles.metricInfo}>
                <span className={styles.metricLabel}>Aktif Slaytlar</span>
                <strong className={styles.metricValue}>{slideCount}</strong>
              </div>
              <div className={styles.metricIcon}>
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>

            {/* Messages Card */}
            <div className={`${styles.metricCard} glass`} id="metric-card-messages">
              <div className={styles.metricInfo}>
                <span className={styles.metricLabel}>Okunmamış Mesajlar</span>
                <strong className={`${styles.metricValue} gradient-text`}>{unreadMessageCount}</strong>
              </div>
              <div className={styles.metricIcon}>
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Recent Messages Section */}
          <div className={styles.section} id="admin-recent-messages-section">
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Son Gelen İletişim Başvuruları</h2>
              <Link href="/admin/messages" style={{ fontSize: "0.9rem", color: "var(--color-primary)", fontWeight: "600" }} id="all-messages-link">
                Tümünü Gör
              </Link>
            </div>

            <div className={styles.tableWrapper}>
              {recentMessages.length === 0 ? (
                <div style={{ padding: "40px", textAlign: "center", color: "var(--text-dim)" }}>
                  Henüz hiç iletişim mesajı alınmadı.
                </div>
              ) : (
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th className={styles.th}>Gönderen</th>
                      <th className={styles.th}>E-posta</th>
                      <th className={styles.th}>Mesaj</th>
                      <th className={styles.th}>Durum</th>
                      <th className={styles.th}>Tarih</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentMessages.map((msg) => (
                      <tr key={msg.id} className={styles.tr}>
                        <td className={styles.td} style={{ fontWeight: "600", color: "#ffffff" }}>
                          {msg.name}
                        </td>
                        <td className={styles.td}>{msg.email}</td>
                        <td className={styles.td} style={{ maxWidth: "300px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {msg.message}
                        </td>
                        <td className={styles.td}>
                          <span className={`${styles.badge} ${msg.read ? styles.badgeRead : styles.badgeUnread}`}>
                            {msg.read ? "Okundu" : "Yeni"}
                          </span>
                        </td>
                        <td className={styles.td}>
                          {new Date(msg.createdAt).toLocaleDateString("tr-TR")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
