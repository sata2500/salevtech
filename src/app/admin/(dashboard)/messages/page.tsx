import prisma from "@/lib/prisma";
import AdminMessagesTable from "@/components/AdminMessagesTable/AdminMessagesTable";
import { ContactMessage } from "@prisma/client";
import styles from "../dashboard.module.css";

export const metadata = {
  title: "Mesaj Yönetimi - Admin",
};

export default async function AdminMessagesPage() {
  let messages: ContactMessage[] = [];
  let dbError = false;

  try {
    messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Database loading messages error:", error);
    dbError = true;
  }

  return (
    <div>
      <div className={styles.pageHeader}>
        <div className={styles.titleArea}>
          <h1 className={styles.pageTitle} id="admin-messages-title">Gelen Mesajlar</h1>
          <p className={styles.pageSubtitle}>İletişim formundan gönderilen başvuruları yönetin</p>
        </div>
      </div>

      {dbError ? (
        <div className="glass" style={{ padding: "40px", borderLeft: "4px solid var(--color-accent)" }} id="db-migration-warning">
          <h2 style={{ fontSize: "1.4rem", fontWeight: "700", marginBottom: "16px", color: "#ffffff" }}>
            Veritabanı Yapılandırması Eksik!
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: "1.6" }}>
            Lütfen veritabanı tablolarınızın oluşturulmuş olduğundan emin olun (`npx prisma db push`).
          </p>
        </div>
      ) : (
        <AdminMessagesTable initialMessages={messages} />
      )}
    </div>
  );
}
