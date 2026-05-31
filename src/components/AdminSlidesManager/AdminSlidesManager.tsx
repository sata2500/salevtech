"use client";

import { useState } from "react";
import { createSlideAction, updateSlideAction, deleteSlideAction } from "@/app/admin/actions";
import styles from "../../app/admin/(dashboard)/dashboard.module.css";

interface Slide {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  linkText: string;
  linkHref: string;
  bgGradient: string;
  imageSrc: string | null;
}

interface AdminSlidesManagerProps {
  initialSlides: Slide[];
}

export default function AdminSlidesManager({ initialSlides }: AdminSlidesManagerProps) {
  const [slides, setSlides] = useState<Slide[]>(initialSlides);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSlide, setEditingSlide] = useState<Slide | null>(null);
  const [loading, setLoading] = useState(false);

  // Form State
  const [badge, setBadge] = useState("");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [linkText, setLinkText] = useState("");
  const [linkHref, setLinkHref] = useState("");
  const [bgGradient, setBgGradient] = useState("");
  const [imageSrc, setImageSrc] = useState("");

  const openAddModal = () => {
    setEditingSlide(null);
    setBadge("");
    setTitle("");
    setSubtitle("");
    setLinkText("Detayları İncele");
    setLinkHref("");
    setBgGradient("linear-gradient(135deg, hsla(190, 100%, 50%, 0.12) 0%, hsla(222, 28%, 7%, 0) 100%)");
    setImageSrc("");
    setModalOpen(true);
  };

  const openEditModal = (slide: Slide) => {
    setEditingSlide(slide);
    setBadge(slide.badge);
    setTitle(slide.title);
    setSubtitle(slide.subtitle);
    setLinkText(slide.linkText);
    setLinkHref(slide.linkHref);
    setBgGradient(slide.bgGradient);
    setImageSrc(slide.imageSrc || "");
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bu slaytı silmek istediğinizden emin misiniz?")) return;
    setLoading(true);
    try {
      await deleteSlideAction(id);
      setSlides((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      console.error(err);
      alert("Slayt silinirken bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      badge,
      title,
      subtitle,
      linkText,
      linkHref,
      bgGradient,
      imageSrc: imageSrc || null,
    };

    try {
      if (editingSlide) {
        await updateSlideAction(editingSlide.id, payload);
        setSlides((prev) =>
          prev.map((s) => (s.id === editingSlide.id ? { ...s, ...payload } : s))
        );
      } else {
        await createSlideAction(payload);
        // Refresh page or reload window to get the newly generated UUID in states safely,
        // or just window.location.reload() for total synchronization.
        window.location.reload();
        return;
      }
      setModalOpen(false);
    } catch (err) {
      console.error(err);
      alert("Slayt kaydedilirken hata oluştu. Girdilerinizi kontrol edin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className={styles.sectionHeader} style={{ borderBottom: "none", marginBottom: "32px" }}>
        <h2 className={styles.sectionTitle}>Slayt Listesi</h2>
        <button className="btn-primary" onClick={openAddModal} style={{ padding: "8px 20px", fontSize: "0.9rem" }} id="btn-add-slide">
          Yeni Slayt Ekle
        </button>
      </div>

      {slides.length === 0 ? (
        <div style={{ padding: "60px 40px", color: "var(--text-dim)", textAlign: "center" }} className="glass" id="no-slides-box">
          Kayıtlı slayt bulunmamaktadır.
        </div>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.th}>Rozet (Badge)</th>
                <th className={styles.th}>Başlık</th>
                <th className={styles.th}>Alt Başlık</th>
                <th className={styles.th}>Link</th>
                <th className={styles.th} style={{ textAlign: "right" }}>İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {slides.map((s) => (
                <tr key={s.id} className={styles.tr} id={`slide-row-${s.id}`}>
                  <td className={styles.td}>
                    <span className={`${styles.badge} ${styles.badgeUnread}`}>{s.badge}</span>
                  </td>
                  <td className={styles.td} style={{ fontWeight: "600", color: "#ffffff" }}>
                    {s.title}
                  </td>
                  <td className={styles.td} style={{ maxWidth: "300px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {s.subtitle}
                  </td>
                  <td className={styles.td}>
                    <a href={s.linkHref} target="_blank" rel="noreferrer" style={{ color: "var(--color-primary)", textDecoration: "underline" }}>
                      {s.linkText}
                    </a>
                  </td>
                  <td className={styles.td} style={{ textAlign: "right" }}>
                    <div className={styles.actionGroup} style={{ justifyContent: "flex-end" }}>
                      <button
                        onClick={() => openEditModal(s)}
                        className={styles.btnAction}
                        title="Düzenle"
                        id={`btn-edit-slide-${s.id}`}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                          <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(s.id)}
                        disabled={loading}
                        className={`${styles.btnAction} ${styles.btnActionDanger}`}
                        title="Sil"
                        id={`btn-delete-slide-${s.id}`}
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
      )}

      {/* Add / Edit Slide Modal */}
      {modalOpen && (
        <div className={styles.modalOverlay} id="slide-modal">
          <div className={`${styles.modal} glass`}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>
                {editingSlide ? "Slaytı Düzenle" : "Yeni Slayt Ekle"}
              </h2>
              <button className={styles.modalClose} onClick={() => setModalOpen(false)} id="btn-close-modal">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Rozet Metni (Badge)</label>
                  <input
                    type="text"
                    required
                    className={styles.input}
                    value={badge}
                    onChange={(e) => setBadge(e.target.value)}
                    placeholder="YENİ GÜNCELLEME"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Başlık</label>
                  <input
                    type="text"
                    required
                    className={styles.input}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Zenit Journal v3.0"
                  />
                </div>

                <div className={styles.formGroupFull}>
                  <label className={styles.label}>Alt Başlık (Açıklama)</label>
                  <textarea
                    required
                    className={styles.textarea}
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    placeholder="Slaytın altında yer alacak tanıtım dizesi..."
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Buton Metni</label>
                  <input
                    type="text"
                    required
                    className={styles.input}
                    value={linkText}
                    onChange={(e) => setLinkText(e.target.value)}
                    placeholder="İncele"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Buton Linki (Href)</label>
                  <input
                    type="text"
                    required
                    className={styles.input}
                    value={linkHref}
                    onChange={(e) => setLinkHref(e.target.value)}
                    placeholder="/apps/zenit-journal"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Arka Plan Degradesi (CSS Gradient)</label>
                  <input
                    type="text"
                    required
                    className={styles.input}
                    value={bgGradient}
                    onChange={(e) => setBgGradient(e.target.value)}
                    placeholder="linear-gradient(135deg, ...)"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Görsel Yolu (İsteğe Bağlı)</label>
                  <input
                    type="text"
                    className={styles.input}
                    value={imageSrc}
                    onChange={(e) => setImageSrc(e.target.value)}
                    placeholder="/logo.png"
                  />
                </div>
              </div>

              <div className={styles.modalActions}>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setModalOpen(false)}
                  style={{ padding: "10px 24px", fontSize: "0.9rem" }}
                  id="btn-cancel-modal"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary"
                  style={{ padding: "10px 24px", fontSize: "0.9rem" }}
                  id="btn-save-modal"
                >
                  {loading ? "Kaydediliyor..." : "Kaydet"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
