export interface PromoSlide {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  linkText: string;
  linkHref: string;
  bgGradient: string;
  imageSrc?: string; // Optional image overlay (like logo or banner)
}

export const promoSlides: PromoSlide[] = [
  {
    id: "promo-zenit-3",
    badge: "YENİ SÜRÜM",
    title: "Zenit Journal v3.0.2 Yayında!",
    subtitle: "Tamamen cihazınızda (offline) çalışan yapay zeka ile duygu analizi ve şık mood grafiklerini deneyimleyin.",
    linkText: "Detayları İncele",
    linkHref: "/apps/zenit-journal",
    bgGradient: "linear-gradient(135deg, hsla(150, 80%, 45%, 0.15) 0%, hsla(222, 28%, 7%, 0) 100%)",
    imageSrc: "/logo.png"
  },
  {
    id: "promo-nova-security",
    badge: "GÜVENLİK GÜNCELLEMESİ",
    title: "Nova Vault ile Sıfır-Bilgi Şifreleme",
    subtitle: "Dosyalarınızı, şifrelerinizi ve notlarınızı askeri düzey AES-256 GCM şifreleme ve biyometrik kilit ile güvende tutun.",
    linkText: "Hemen İndir",
    linkHref: "/apps/nova-vault",
    bgGradient: "linear-gradient(135deg, hsla(270, 95%, 65%, 0.15) 0%, hsla(222, 28%, 7%, 0) 100%)"
  },
  {
    id: "promo-kvkk-compliance",
    badge: "YASAL BİLGİLENDİRME",
    title: "KVKK & GDPR Aydınlatma Metni",
    subtitle: "Kullanıcılarımızın gizlilik haklarını nasıl koruduğumuza dair detaylı yasal aydınlatma metinlerimizi inceleyin.",
    linkText: "Metni Oku",
    linkHref: "/gdpr",
    bgGradient: "linear-gradient(135deg, hsla(190, 100%, 50%, 0.12) 0%, hsla(222, 28%, 7%, 0) 100%)"
  }
];
