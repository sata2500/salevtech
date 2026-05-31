"use client";

import { useState } from "react";
import { markMessageAsReadAction, deleteMessageAction } from "@/app/admin/actions";
import styles from "../../app/admin/(dashboard)/dashboard.module.css";

interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: Date;
}

interface AdminMessagesTableProps {
  initialMessages: Message[];
}

export default function AdminMessagesTable({ initialMessages }: AdminMessagesTableProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleToggleRead = async (id: string, currentRead: boolean) => {
    setLoadingId(id);
    try {
      await markMessageAsReadAction(id, !currentRead);
      setMessages((prev) =>
        prev.map((msg) => (msg.id === id ? { ...msg, read: !currentRead } : msg))
      );
    } catch (err) {
      console.error(err);
      alert("Mesaj durumu güncellenirken bir hata oluştu.");
    } finally {
      setLoadingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bu mesajı silmek istediğinizden emin misiniz?")) return;
    setLoadingId(id);
    try {
      await deleteMessageAction(id);
      setMessages((prev) => prev.filter((msg) => msg.id !== id));
    } catch (err) {
      console.error(err);
      alert("Mesaj silinirken bir hata oluştu.");
    } finally {
      setLoadingId(null);
    }
  };

  if (messages.length === 0) {
    return (
      <div style={{ padding: "60px 40px", color: "var(--text-dim)", textAlign: "center" }} className="glass" id="no-messages-box">
        Gelen kutunuz boş! Henüz hiç mesaj alınmadı.
      </div>
    );
  }

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>Gönderen</th>
            <th className={styles.th}>E-posta</th>
            <th className={styles.th}>Mesaj</th>
            <th className={styles.th}>Tarih</th>
            <th className={styles.th}>Durum</th>
            <th className={styles.th} style={{ textAlign: "right" }}>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((msg) => (
            <tr key={msg.id} className={styles.tr} id={`message-row-${msg.id}`}>
              <td className={styles.td} style={{ fontWeight: "600", color: "#ffffff" }}>
                {msg.name}
              </td>
              <td className={styles.td}>
                <a href={`mailto:${msg.email}`} style={{ color: "var(--color-primary)", textDecoration: "underline" }}>
                  {msg.email}
                </a>
              </td>
              <td className={styles.td} style={{ maxWidth: "400px", wordBreak: "break-word" }}>
                {msg.message}
              </td>
              <td className={styles.td}>
                {new Date(msg.createdAt).toLocaleString("tr-TR")}
              </td>
              <td className={styles.td}>
                <span className={`${styles.badge} ${msg.read ? styles.badgeRead : styles.badgeUnread}`}>
                  {msg.read ? "Okundu" : "Yeni"}
                </span>
              </td>
              <td className={styles.td} style={{ textAlign: "right" }}>
                <div className={styles.actionGroup} style={{ justifyContent: "flex-end" }}>
                  <button
                    onClick={() => handleToggleRead(msg.id, msg.read)}
                    disabled={loadingId === msg.id}
                    className={styles.btnAction}
                    title={msg.read ? "Okunmadı Olarak İşaretle" : "Okundu Olarak İşaretle"}
                    aria-label={`Toggle read state for message ${msg.id}`}
                    id={`btn-read-toggle-${msg.id}`}
                  >
                    {msg.read ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    )}
                  </button>
                  <button
                    onClick={() => handleDelete(msg.id)}
                    disabled={loadingId === msg.id}
                    className={`${styles.btnAction} ${styles.btnActionDanger}`}
                    title="Mesajı Sil"
                    aria-label={`Delete message ${msg.id}`}
                    id={`btn-delete-message-${msg.id}`}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
