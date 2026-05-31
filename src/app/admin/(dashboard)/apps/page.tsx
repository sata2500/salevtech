import prisma from "@/lib/prisma";
import AdminAppsManager from "@/components/AdminAppsManager/AdminAppsManager";
import styles from "../dashboard.module.css";

export const metadata = {
  title: "Uygulama Yönetimi - Admin",
  description: "Android uygulamalarınızın yönetilmesi",
};

export const dynamic = "force-dynamic";

export default async function AdminAppsPage() {
  const apps = await prisma.androidApp.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  // Map JSON type from prisma to strongly-typed AndroidApp
  const serializedApps = apps.map((app) => ({
    id: app.id,
    slug: app.slug,
    title: app.title,
    tagline: app.tagline,
    description: app.description,
    longDescription: app.longDescription,
    iconGradient: app.iconGradient,
    iconSvg: app.iconSvg,
    version: app.version,
    size: app.size,
    releaseDate: app.releaseDate,
    playStoreUrl: app.playStoreUrl,
    apkUrl: app.apkUrl,
    category: app.category,
    accentColor: app.accentColor,
    features: app.features,
    minSdk: app.minSdk,
    targetSdk: app.targetSdk,
    architecture: app.architecture,
    permissions: app.permissions,
    changelog: Array.isArray(app.changelog) ? (app.changelog as any) : [],
  }));

  return (
    <div className={styles.section} id="admin-apps-section">
      <div className={styles.pageHeader}>
        <div className={styles.titleArea}>
          <h1 className={styles.pageTitle}>Uygulama Portfolyosu</h1>
          <p className={styles.pageSubtitle}>
            Web sitenizde tanıtılan Android uygulamalarını ekleyin, detaylarını güncelleyin veya kaldırın.
          </p>
        </div>
      </div>

      <AdminAppsManager initialApps={serializedApps} />
    </div>
  );
}
