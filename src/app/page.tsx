import Image from "next/image";
import { androidApps } from "@/data/apps";
import { promoSlides as staticPromoSlides } from "@/data/promos";
import prisma from "@/lib/prisma";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import AppCard from "@/components/AppCard/AppCard";
import ContactForm from "@/components/ContactForm/ContactForm";
import PromoSlider from "@/components/PromoSlider/PromoSlider";
import styles from "./page.module.css";

export const dynamic = "force-dynamic";

async function getDynamicData() {
  try {
    const [dbApps, dbSlides] = await Promise.all([
      prisma.androidApp.findMany({ orderBy: { createdAt: "asc" } }),
      prisma.promoSlide.findMany({ orderBy: { createdAt: "asc" } }),
    ]);

    const apps =
      dbApps.length > 0
        ? dbApps.map((a) => ({
            id: a.id,
            slug: a.slug,
            title: a.title,
            tagline: a.tagline,
            description: a.description,
            longDescription: a.longDescription,
            iconGradient: a.iconGradient,
            iconSvg: a.iconSvg,
            version: a.version,
            size: a.size,
            releaseDate: a.releaseDate,
            playStoreUrl: a.playStoreUrl,
            apkUrl: a.apkUrl,
            category: a.category,
            accentColor: a.accentColor,
            features: a.features,
            specs: {
              minSdk: a.minSdk,
              targetSdk: a.targetSdk,
              architecture: a.architecture,
              permissions: a.permissions,
            },
            changelog: Array.isArray(a.changelog)
              ? (a.changelog as any[]).map((e: any) => ({
                  version: e.version ?? "",
                  date: e.date ?? "",
                  notes: Array.isArray(e.notes) ? e.notes : [],
                }))
              : [],
          }))
        : androidApps;

    const slides =
      dbSlides.length > 0
        ? dbSlides.map((s) => ({
            id: s.id,
            badge: s.badge,
            title: s.title,
            subtitle: s.subtitle,
            linkText: s.linkText,
            linkHref: s.linkHref,
            bgGradient: s.bgGradient,
            imageSrc: s.imageSrc ?? null,
          }))
        : staticPromoSlides.map((s) => ({
            ...s,
            imageSrc: s.imageSrc ?? null,
          }));

    return { apps, slides };
  } catch {
    // DB connection unavailable – use static mock data as fallback
    return {
      apps: androidApps,
      slides: staticPromoSlides.map((s) => ({ ...s, imageSrc: s.imageSrc ?? null })),
    };
  }
}

export default async function Home() {
  const { apps, slides } = await getDynamicData();

  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className={styles.hero} id="home">
        {/* Glow Elements */}
        <div className="pulse-glow-purple" style={{ top: "10%", left: "10%" }}></div>
        <div className="pulse-glow-cyan" style={{ bottom: "20%", right: "10%" }}></div>

        <div className="container">
          <div className={styles.heroGrid}>
            <div className={styles.heroContent}>
              <span className={styles.badge}>Salev Tech Studio</span>
              <h1 className={styles.title}>
                Sıra Dışı <span className="gradient-text">Android</span> Uygulamalarıyla Tanışın
              </h1>
              <p className={styles.tagline}>
                Minimalizmi, modern güvenliği ve yüksek performansı bir araya getiren mobil uygulamalar geliştiriyoruz. 
                Cihazınızda en yüksek verimle çalışacak çözümlerimizi hemen deneyimleyin.
              </p>
              <div className={styles.ctas}>
                <a href="#apps" className="btn-primary" id="hero-cta-apps">
                  Uygulamaları Keşfet
                </a>
                <a href="#about" className="btn-secondary" id="hero-cta-about">
                  Hakkımızda
                </a>
              </div>
            </div>

            {/* Banner Showcase */}
            <div className={styles.bannerWrapper} id="hero-banner">
              <Image
                src="/banner.png"
                alt="Salev Tech Google Play Banner"
                fill
                priority
                sizes="(max-width: 992px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Apps Section */}
      <section className="section-padding" id="apps">
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.badge}>Portfolyo</span>
            <h2 className={styles.sectionTitle}>Geliştirdiğimiz Uygulamalar</h2>
            <p className={styles.sectionSubtitle}>
              Kullanıcılarımızın günlük hayatını kolaylaştırmak amacıyla tasarlanmış en popüler Android yazılımlarımız.
            </p>
          </div>

          <PromoSlider initialSlides={slides} />

          <div className={styles.appsGrid}>
            {apps.map((app) => (
              <AppCard key={app.id} app={app} />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section-padding" id="about" style={{ borderTop: "1px solid var(--border-light)" }}>
        <div className="container">
          <div className={styles.aboutGrid}>
            <div className={styles.aboutText}>
              <span className={styles.badge}>Vizyon</span>
              <h2 className={styles.sectionTitle}>Gizlilik ve Performans Odaklı Geliştirme</h2>
              <p className={styles.aboutDescription}>
                Salev Tech olarak ürettiğimiz her mobil uygulamada üç temel kuralı rehber ediniyoruz: kullanıcı gizliliği, 
                düşük sistem kaynağı tüketimi ve kesintisiz kararlılık. Verilerinizi izinsiz toplamıyor, sistem kaynaklarınızı sömürmüyoruz.
              </p>

              <div className={styles.featuresList}>
                <div className={styles.aboutFeature}>
                  <div className={styles.featureIconWrapper}>
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className={styles.featureTitle}>Sıfır Bilgi Güvenliği (Zero-Knowledge)</h4>
                    <p className={styles.featureText}>Verileriniz bizim sunucularımıza değil, yalnızca kendi cihazınızdaki güvenli alana kaydedilir.</p>
                  </div>
                </div>

                <div className={styles.aboutFeature}>
                  <div className={styles.featureIconWrapper}>
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className={styles.featureTitle}>Düşük Pil ve Hafıza Tüketimi</h4>
                    <p className={styles.featureText}>Yerel kodlamalar sayesinde uygulamalarımız arka planda bataryanızı ve RAM&apos;inizi gereksiz yormaz.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Abstract Graphic */}
            <div className={styles.aboutVisual}>
              <div className={styles.neonRing}></div>
              <div className={styles.visualCore}>
                <svg className={styles.visualSvg} viewBox="0 0 24 24">
                  <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 14h-2v-6h2zm0-8h-2V7h2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={`section-padding ${styles.statsSection}`}>
        <div className="container">
          <div className={styles.statsGrid}>
            <div className={`${styles.statCard} glass`}>
              <div className={`${styles.statNumber} gradient-text`}>1M+</div>
              <div className={styles.statLabel}>Toplam İndirme</div>
            </div>
            <div className={`${styles.statCard} glass`}>
              <div className={`${styles.statNumber} gradient-text-pink`}>4.8/5</div>
              <div className={styles.statLabel}>Kullanıcı Puanı</div>
            </div>
            <div className={`${styles.statCard} glass`}>
              <div className={`${styles.statNumber} gradient-text`}>%100</div>
              <div className={styles.statLabel}>Güvenli / Reklamsız</div>
            </div>
            <div className={`${styles.statCard} glass`}>
              <div className={`${styles.statNumber} gradient-text-pink`}>{apps.length}+</div>
              <div className={styles.statLabel}>Aktif Mobil Uygulama</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding" id="contact">
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.badge}>İletişim</span>
            <h2 className={styles.sectionTitle}>Bizimle İletişime Geçin</h2>
            <p className={styles.sectionSubtitle}>
              Görüş, öneri veya destek talepleriniz için aşağıdaki formu doldurabilir ya da doğrudan e-posta gönderebilirsiniz.
            </p>
          </div>

          <ContactForm />
        </div>
      </section>

      <Footer />
    </>
  );
}
