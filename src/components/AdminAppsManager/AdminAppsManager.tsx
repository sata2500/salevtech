"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createAppAction, updateAppAction, deleteAppAction } from "@/app/admin/actions";
import styles from "../../app/admin/(dashboard)/dashboard.module.css";

interface ChangelogEntry {
  version: string;
  date: string;
  notes: string[];
}

interface AndroidApp {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  iconGradient: string;
  iconSvg: string;
  version: string;
  size: string;
  releaseDate: string;
  playStoreUrl: string;
  apkUrl: string;
  category: string;
  accentColor: string;
  features: string[];
  minSdk: string;
  targetSdk: string;
  architecture: string;
  permissions: string[];
  changelog: ChangelogEntry[];
}

interface AdminAppsManagerProps {
  initialApps: AndroidApp[];
}

export default function AdminAppsManager({ initialApps }: AdminAppsManagerProps) {
  const [apps, setApps] = useState<AndroidApp[]>(initialApps);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingApp, setEditingApp] = useState<AndroidApp | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Form State
  const [id, setId] = useState("");
  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");
  const [tagline, setTagline] = useState("");
  const [description, setDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [iconGradient, setIconGradient] = useState("");
  const [iconSvg, setIconSvg] = useState("");
  const [version, setVersion] = useState("");
  const [size, setSize] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [playStoreUrl, setPlayStoreUrl] = useState("");
  const [apkUrl, setApkUrl] = useState("");
  const [category, setCategory] = useState("");
  const [accentColor, setAccentColor] = useState("");
  const [featuresText, setFeaturesText] = useState("");
  const [minSdk, setMinSdk] = useState("");
  const [targetSdk, setTargetSdk] = useState("");
  const [architecture, setArchitecture] = useState("");
  const [permissionsText, setPermissionsText] = useState("");
  const [changelog, setChangelog] = useState<ChangelogEntry[]>([]);

  // Helpers to manage nested changelog array
  const addChangelogEntry = () => {
    setChangelog((prev) => [...prev, { version: "", date: "", notes: [] }]);
  };

  const removeChangelogEntry = (index: number) => {
    setChangelog((prev) => prev.filter((_, i) => i !== index));
  };

  const updateChangelogField = (index: number, field: keyof ChangelogEntry, value: any) => {
    setChangelog((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  const openAddModal = () => {
    setEditingApp(null);
    setId("");
    setSlug("");
    setTitle("");
    setTagline("");
    setDescription("");
    setLongDescription("");
    setIconGradient("linear-gradient(135deg, #10b981 0%, #059669 100%)");
    setIconSvg('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="4"/></svg>');
    setVersion("1.0.0");
    setSize("15 MB");
    setReleaseDate(new Date().toLocaleDateString("tr-TR"));
    setPlayStoreUrl("https://play.google.com/store/apps/details?id=");
    setApkUrl("/apks/download.apk");
    setCategory("Araçlar");
    setAccentColor("#10b981");
    setFeaturesText("");
    setMinSdk("Android 8.0 (API 26)");
    setTargetSdk("Android 14 (API 34)");
    setArchitecture("universal");
    setPermissionsText("");
    setChangelog([]);
    setModalOpen(true);
  };

  const openEditModal = (app: AndroidApp) => {
    setEditingApp(app);
    setId(app.id);
    setSlug(app.slug);
    setTitle(app.title);
    setTagline(app.tagline);
    setDescription(app.description);
    setLongDescription(app.longDescription);
    setIconGradient(app.iconGradient);
    setIconSvg(app.iconSvg);
    setVersion(app.version);
    setSize(app.size);
    setReleaseDate(app.releaseDate);
    setPlayStoreUrl(app.playStoreUrl);
    setApkUrl(app.apkUrl);
    setCategory(app.category);
    setAccentColor(app.accentColor);
    setFeaturesText(app.features.join("\n"));
    setMinSdk(app.minSdk);
    setTargetSdk(app.targetSdk);
    setArchitecture(app.architecture);
    setPermissionsText(app.permissions.join("\n"));
    
    // Parse changelog safely
    const parsedChangelog = Array.isArray(app.changelog)
      ? app.changelog.map((entry: any) => ({
          version: entry.version || "",
          date: entry.date || "",
          notes: Array.isArray(entry.notes) ? entry.notes : [],
        }))
      : [];
    setChangelog(parsedChangelog);
    setModalOpen(true);
  };

  const handleDelete = async (appId: string) => {
    if (!confirm("Bu uygulamayı ve tüm verilerini silmek istediğinizden emin misiniz?")) return;
    setLoading(true);
    try {
      await deleteAppAction(appId);
      setApps((prev) => prev.filter((a) => a.id !== appId));
    } catch (err) {
      console.error(err);
      alert("Uygulama silinirken bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const features = featuresText
      .split("\n")
      .map((item) => item.trim())
      .filter((item) => item.length > 0);

    const permissions = permissionsText
      .split("\n")
      .map((item) => item.trim())
      .filter((item) => item.length > 0);

    const payload = {
      id,
      slug,
      title,
      tagline,
      description,
      longDescription,
      iconGradient,
      iconSvg,
      version,
      size,
      releaseDate,
      playStoreUrl,
      apkUrl,
      category,
      accentColor,
      features,
      minSdk,
      targetSdk,
      architecture,
      permissions,
      changelog,
    };

    try {
      if (editingApp) {
        await updateAppAction(editingApp.id, payload);
      } else {
        await createAppAction(payload);
      }
      setModalOpen(false);
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Hata oluştu! Girdilerinizi kontrol edin (URL biçimi, minimum uzunluklar vb.).");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className={styles.sectionHeader} style={{ borderBottom: "none", marginBottom: "32px" }}>
        <h2 className={styles.sectionTitle}>Uygulama Listesi</h2>
        <button className="btn-primary" onClick={openAddModal} style={{ padding: "8px 20px", fontSize: "0.9rem" }} id="btn-add-app">
          Yeni Uygulama Ekle
        </button>
      </div>

      {apps.length === 0 ? (
        <div style={{ padding: "60px 40px", color: "var(--text-dim)", textAlign: "center" }} className="glass" id="no-apps-box">
          Kayıtlı uygulama bulunmamaktadır.
        </div>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.th}>Simge / Başlık</th>
                <th className={styles.th}>Paket ID (Paket Adı)</th>
                <th className={styles.th}>Sürüm</th>
                <th className={styles.th}>Kategori</th>
                <th className={styles.th} style={{ textAlign: "right" }}>İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {apps.map((app) => (
                <tr key={app.id} className={styles.tr} id={`app-row-${app.id}`}>
                  <td className={styles.td} style={{ fontWeight: "600", color: "#ffffff" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div
                        style={{
                          width: "36px",
                          height: "36px",
                          borderRadius: "8px",
                          background: app.iconGradient,
                          padding: "6px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#ffffff",
                        }}
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: "100%", height: "100%" }}>
                          <path d={app.iconSvg} />
                        </svg>
                      </div>
                      <span>{app.title}</span>
                    </div>
                  </td>
                  <td className={styles.td}>{app.id}</td>
                  <td className={styles.td}>{app.version}</td>
                  <td className={styles.td}>{app.category}</td>
                  <td className={styles.td} style={{ textAlign: "right" }}>
                    <div className={styles.actionGroup} style={{ justifyContent: "flex-end" }}>
                      <button
                        onClick={() => openEditModal(app)}
                        className={styles.btnAction}
                        title="Düzenle"
                        id={`btn-edit-app-${app.slug}`}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                          <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(app.id)}
                        disabled={loading}
                        className={`${styles.btnAction} ${styles.btnActionDanger}`}
                        title="Sil"
                        id={`btn-delete-app-${app.slug}`}
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

      {/* Add / Edit App Modal */}
      {modalOpen && (
        <div className={styles.modalOverlay} id="app-modal">
          <div className={`${styles.modal} glass`}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>
                {editingApp ? "Uygulamayı Düzenle" : "Yeni Uygulama Ekle"}
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
                {/* 1. Package ID */}
                <div className={styles.formGroup}>
                  <label className={styles.label}>Paket Adı (Package ID)</label>
                  <input
                    type="text"
                    required
                    disabled={!!editingApp}
                    className={styles.input}
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    placeholder="com.salev.zenitjournal"
                  />
                </div>

                {/* 2. Slug */}
                <div className={styles.formGroup}>
                  <label className={styles.label}>Slug (Link Adı)</label>
                  <input
                    type="text"
                    required
                    className={styles.input}
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="zenit-journal"
                  />
                </div>

                {/* 3. Title */}
                <div className={styles.formGroup}>
                  <label className={styles.label}>Uygulama Adı</label>
                  <input
                    type="text"
                    required
                    className={styles.input}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Zenit Journal"
                  />
                </div>

                {/* 4. Tagline */}
                <div className={styles.formGroup}>
                  <label className={styles.label}>Kısa Slogan (Tagline)</label>
                  <input
                    type="text"
                    required
                    className={styles.input}
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                    placeholder="Minimalist ve Güvenli Günlük"
                  />
                </div>

                {/* 5. Short Description */}
                <div className={styles.formGroupFull}>
                  <label className={styles.label}>Kısa Açıklama (Listeleme)</label>
                  <input
                    type="text"
                    required
                    className={styles.input}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Düşüncelerinizi şifreli, reklamsız ve tamamen yerel depolama ile saklayın."
                  />
                </div>

                {/* 6. Long Description */}
                <div className={styles.formGroupFull}>
                  <label className={styles.label}>Uzun Açıklama (Detay Sayfası)</label>
                  <textarea
                    required
                    className={styles.textarea}
                    value={longDescription}
                    onChange={(e) => setLongDescription(e.target.value)}
                    placeholder="Uygulamanın tüm özelliklerini, sunduğu çözümleri tanıtan uzun metin..."
                  />
                </div>

                {/* 7. Icon Gradient */}
                <div className={styles.formGroup}>
                  <label className={styles.label}>Simge Degradesi (CSS Gradient)</label>
                  <input
                    type="text"
                    required
                    className={styles.input}
                    value={iconGradient}
                    onChange={(e) => setIconGradient(e.target.value)}
                    placeholder="linear-gradient(135deg, #10b981 0%, #059669 100%)"
                  />
                </div>

                {/* 8. Accent Color */}
                <div className={styles.formGroup}>
                  <label className={styles.label}>Vurgu Rengi (Hex Color)</label>
                  <input
                    type="text"
                    required
                    className={styles.input}
                    value={accentColor}
                    onChange={(e) => setAccentColor(e.target.value)}
                    placeholder="#10b981"
                  />
                </div>

                {/* 9. Icon SVG */}
                <div className={styles.formGroupFull}>
                  <label className={styles.label}>Simge SVG Path Verisi (yalnızca &quot;d&quot; değeri)</label>
                  <textarea
                    required
                    className={styles.textarea}
                    style={{ minHeight: "80px", fontFamily: "monospace", fontSize: "0.85rem" }}
                    value={iconSvg}
                    onChange={(e) => setIconSvg(e.target.value)}
                  />
                </div>

                {/* 10. Technical Specs */}
                <div className={styles.formGroup}>
                  <label className={styles.label}>Kategori</label>
                  <input
                    type="text"
                    required
                    className={styles.input}
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Verimlilik / Araçlar"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Versiyon</label>
                  <input
                    type="text"
                    required
                    className={styles.input}
                    value={version}
                    onChange={(e) => setVersion(e.target.value)}
                    placeholder="1.0.0"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Dosya Boyutu</label>
                  <input
                    type="text"
                    required
                    className={styles.input}
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    placeholder="12 MB"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Yayın / Güncelleme Tarihi</label>
                  <input
                    type="text"
                    required
                    className={styles.input}
                    value={releaseDate}
                    onChange={(e) => setReleaseDate(e.target.value)}
                    placeholder="31.05.2026"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Min SDK</label>
                  <input
                    type="text"
                    required
                    className={styles.input}
                    value={minSdk}
                    onChange={(e) => setMinSdk(e.target.value)}
                    placeholder="Android 8.0 (API 26)"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Target SDK</label>
                  <input
                    type="text"
                    required
                    className={styles.input}
                    value={targetSdk}
                    onChange={(e) => setTargetSdk(e.target.value)}
                    placeholder="Android 14 (API 34)"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Mimari</label>
                  <input
                    type="text"
                    required
                    className={styles.input}
                    value={architecture}
                    onChange={(e) => setArchitecture(e.target.value)}
                    placeholder="arm64-v8a, armeabi-v7a, x86_64"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Play Store Bağlantısı</label>
                  <input
                    type="text"
                    required
                    className={styles.input}
                    value={playStoreUrl}
                    onChange={(e) => setPlayStoreUrl(e.target.value)}
                    placeholder="https://play.google.com/store/apps/details?id=..."
                  />
                </div>

                <div className={styles.formGroupFull}>
                  <label className={styles.label}>APK Dosya İndirme Linki</label>
                  <input
                    type="text"
                    required
                    className={styles.input}
                    value={apkUrl}
                    onChange={(e) => setApkUrl(e.target.value)}
                    placeholder="/apks/zenit-journal.apk"
                  />
                </div>

                {/* 11. Array List Items */}
                <div className={styles.formGroupFull}>
                  <label className={styles.label}>Ana Özellikler (Her satıra bir tane yazın)</label>
                  <textarea
                    className={styles.textarea}
                    style={{ minHeight: "100px" }}
                    value={featuresText}
                    onChange={(e) => setFeaturesText(e.target.value)}
                    placeholder="Biyometrik kilit koruması&#10;Yerel SQLite veri tabanı&#10;Günlük hatırlatıcı bildirimleri"
                  />
                </div>

                <div className={styles.formGroupFull}>
                  <label className={styles.label}>İstenen İzinler (Her satıra bir tane yazın)</label>
                  <textarea
                    className={styles.textarea}
                    style={{ minHeight: "100px" }}
                    value={permissionsText}
                    onChange={(e) => setPermissionsText(e.target.value)}
                    placeholder="android.permission.USE_BIOMETRIC&#10;android.permission.POST_NOTIFICATIONS"
                  />
                </div>

                {/* 12. Dynamic Nested Changelog list */}
                <div className={styles.formGroupFull} style={{ marginTop: "20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                    <label className={styles.label} style={{ margin: 0 }}>Gelişim Günlüğü (Changelog)</label>
                    <button
                      type="button"
                      className="btn-secondary"
                      style={{ padding: "4px 12px", fontSize: "0.8rem" }}
                      onClick={addChangelogEntry}
                    >
                      Yeni Sürüm Notu Ekle
                    </button>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    {changelog.map((entry, index) => (
                      <div
                        key={index}
                        className="glass"
                        style={{ padding: "20px", borderRadius: "10px", display: "flex", flexDirection: "column", gap: "12px" }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span style={{ fontSize: "0.9rem", fontWeight: "700" }}>Sürüm Kaydı #{index + 1}</span>
                          <button
                            type="button"
                            onClick={() => removeChangelogEntry(index)}
                            style={{ background: "transparent", border: "none", color: "#f43f5e", cursor: "pointer", fontSize: "0.8rem" }}
                          >
                            Kaldır
                          </button>
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                          <div className={styles.formGroup}>
                            <label className={styles.label}>Sürüm No</label>
                            <input
                              type="text"
                              required
                              className={styles.input}
                              value={entry.version}
                              onChange={(e) => updateChangelogField(index, "version", e.target.value)}
                              placeholder="v1.1.0"
                            />
                          </div>
                          <div className={styles.formGroup}>
                            <label className={styles.label}>Tarih</label>
                            <input
                              type="text"
                              required
                              className={styles.input}
                              value={entry.date}
                              onChange={(e) => updateChangelogField(index, "date", e.target.value)}
                              placeholder="25.05.2026"
                            />
                          </div>
                        </div>

                        <div className={styles.formGroup}>
                          <label className={styles.label}>Yenilikler (Her satıra bir adet)</label>
                          <textarea
                            className={styles.textarea}
                            style={{ minHeight: "80px" }}
                            value={entry.notes.join("\n")}
                            onChange={(e) =>
                              updateChangelogField(
                                index,
                                "notes",
                                e.target.value
                                  .split("\n")
                                  .map((n) => n.trim())
                                  .filter((n) => n.length > 0)
                              )
                            }
                            placeholder="Karanlık tema desteği eklendi.&#10;Performans iyileştirmeleri yapıldı."
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Form Actions */}
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
