import prisma from "@/lib/prisma";
import AdminSlidesManager from "@/components/AdminSlidesManager/AdminSlidesManager";
import styles from "../dashboard.module.css";

export const metadata = {
  title: "Slayt Yönetimi - Admin",
  description: "Duyuru ve slayt alanının yönetilmesi",
};

export const dynamic = "force-dynamic";

export default async function AdminSlidesPage() {
  const slides = await prisma.promoSlide.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  // Map Date fields to string/JSON compatible if needed, or serialize.
  // Actually, slides from prisma have createdAt/updatedAt as Date objects.
  // AdminSlidesManager interface expects Slide with Date properties, or we can format.
  // Let's check AdminSlidesManager's interface. It expects Slide with:
  // id, badge, title, subtitle, linkText, linkHref, bgGradient, imageSrc
  // It doesn't explicitly declare createdAt/updatedAt in its interface, so we can pass them as is.
  const serializedSlides = slides.map((s) => ({
    id: s.id,
    badge: s.badge,
    title: s.title,
    subtitle: s.subtitle,
    linkText: s.linkText,
    linkHref: s.linkHref,
    bgGradient: s.bgGradient,
    imageSrc: s.imageSrc,
  }));

  return (
    <div className={styles.section} id="admin-slides-section">
      <div className={styles.pageHeader}>
        <div className={styles.titleArea}>
          <h1 className={styles.pageTitle}>Slayt / Duyuru Yönetimi</h1>
          <p className={styles.pageSubtitle}>
            Ana sayfanın en üstünde yer alan otomatik kayan duyuruları ekleyin, düzenleyin veya kaldırın.
          </p>
        </div>
      </div>

      <AdminSlidesManager initialSlides={serializedSlides} />
    </div>
  );
}
