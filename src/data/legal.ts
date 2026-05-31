export interface LegalSection {
  title: string;
  content: string[];
}

export interface LegalDocument {
  id: string;
  title: string;
  lastUpdated: string;
  description: string;
  sections: LegalSection[];
}

export const legalDocuments: Record<string, LegalDocument> = {
  "privacy-policy": {
    id: "privacy-policy",
    title: "Gizlilik Politikası (Privacy Policy)",
    lastUpdated: "31 Mayıs 2026",
    description: "Salev Tech mobil uygulamalarını ve web sitesini kullanırken kişisel verilerinizin nasıl toplandığı, kullanıldığı ve korunduğu hakkında detaylı bilgilendirme.",
    sections: [
      {
        title: "1. Giriş",
        content: [
          "Salev Tech olarak gizliliğinize büyük önem veriyoruz. Bu Gizlilik Politikası, uygulamalarımızı (Aether Player, Nova Vault, Zenit Journal) ve salev.tech web sitesini kullandığınızda elde ettiğimiz bilgilerin nasıl toplandığını, işlendiğini ve korunduğunu açıklamaktadır.",
          "Uygulamalarımızı kullanarak, bu politikada açıklanan veri toplama ve kullanım yöntemlerini kabul etmiş olursunuz."
        ]
      },
      {
        title: "2. Toplanan Veriler",
        content: [
          "Uygulamalarımızın çoğu 'Yerel Öncelikli' (Local-First) prensibine göre tasarlanmıştır. Bu bağlamda, verileriniz öncelikli olarak cihazınızın güvenli depolama biriminde saklanır.",
          "Kişisel Veriler: Herhangi bir hesap oluşturma işlemi gerektirmeyen uygulamalarımızda doğrudan ad, soyad veya e-posta gibi kişisel bilgileriniz sunucularımıza iletilmez.",
          "Analitik ve Kullanım Verileri: Hata raporlama ve uygulama performansını artırma amacıyla tamamen anonimleştirilmiş cihaz modeli, işletim sistemi sürümü ve kilitlenme (crash) raporları üçüncü taraf analiz araçları (örneğin Firebase Crashlytics) vasıtasıyla toplanabilir.",
          "Uygulama İçi İzinler: Uygulamalarımızın düzgün çalışabilmesi için talep edilen depolama alanı erişimi, biyometrik yetkilendirme gibi izinler yalnızca cihaz düzeyinde işlenir ve hiçbir şekilde uzaktaki bir sunucuya aktarılmaz."
        ]
      },
      {
        title: "3. Veri Güvenliği",
        content: [
          "Verilerinizin güvenliğini sağlamak için endüstri standardı şifreleme yöntemleri (örneğin AES-256) kullanıyoruz. Özellikle Nova Vault gibi şifreleme odaklı uygulamalarımızda 'Sıfır Bilgi' (Zero-Knowledge) mimarisi uygulanır; yani şifre anahtarlarınız veya verileriniz bizim tarafımızdan asla bilinemez veya kurtarılamaz."
        ]
      },
      {
        title: "4. Üçüncü Taraf Hizmetleri",
        content: [
          "Uygulamalarımızda reklam gösterimi, bulut senkronizasyonu veya hata analizi amacıyla güvenilir üçüncü taraf kütüphaneleri kullanılabilir. Bu hizmet sağlayıcıların kendi gizlilik politikaları geçerlidir ve verilerinizi yalnızca kendi politikaları çerçevesinde işleyebilirler.",
          "Kullanıcılarımızın, kullandıkları bulut senkronizasyon seçeneklerinde (WebDAV, Google Drive, Dropbox vb.) kendi hesap güvenliklerinden sorumlu olduklarını hatırlatmak isteriz."
        ]
      },
      {
        title: "5. İletişim ve Haklarınız",
        content: [
          "Kişisel verilerinizin işlenip işlenmediğini öğrenme, işlenmişse bilgi talep etme veya verilerinizin silinmesini isteme hakkına sahipsiniz. Her türlü soru, görüş ve hak talebiniz için info@salev.tech adresi üzerinden bizimle iletişime geçebilirsiniz."
        ]
      }
    ]
  },
  "terms-of-service": {
    id: "terms-of-service",
    title: "Kullanım Koşulları (Terms of Service)",
    lastUpdated: "31 Mayıs 2026",
    description: "Salev Tech uygulamalarını indirirken ve kullanırken uymanız gereken yasal kurallar ve kullanıcı sözleşmesi.",
    sections: [
      {
        title: "1. Kabul ve Koşullar",
        content: [
          "salev.tech web sitesine erişerek veya Salev Tech tarafından geliştirilen herhangi bir Android uygulamasını indirerek, bu Kullanım Koşullarını eksiksiz olarak kabul etmiş olursunuz.",
          "Eğer bu koşullardan herhangi birini kabul etmiyorsanız, web sitesini kullanmayı ve uygulamaları indirmeyi derhal durdurmalısınız."
        ]
      },
      {
        title: "2. Lisans ve Fikri Mülkiyet",
        content: [
          "Aksi belirtilmedikçe, salev.tech web sitesindeki tüm kodlar, tasarımlar, logolar ve uygulamalarımızın telif hakları ile fikri mülkiyet hakları Salev Tech'e aittir. Tüm hakları saklıdır.",
          "Uygulamalarımızı yalnızca kişisel ve ticari olmayan amaçlarla kullanmanız için size devredilemez, sınırlı ve geri alınabilir bir lisans verilmektedir. Uygulama kaynak kodlarını kopyalayamaz, değiştiremez veya tersine mühendislik işlemlerine tabi tutamazsınız."
        ]
      },
      {
        title: "3. Sorumluluk Reddi (Disclaimer)",
        content: [
          "Salev Tech uygulamaları ve hizmetleri 'olduğu gibi' (as is) esasıyla sunulmaktadır. Uygulamaların kesintisiz, hatasız veya tamamen güvenli olacağına dair açık veya zımni hiçbir garanti verilmemektedir.",
          "Nova Vault veya Zenit Journal gibi yerel veri tabanı kullanan uygulamalarımızda, cihaz arızası, şifre unutulması veya veri tabanı kaybı nedeniyle oluşabilecek veri kayıplarından Salev Tech sorumlu tutulamaz. Verilerinizi düzenli olarak yedeklemek tamamen sizin sorumluluğunuzdadır."
        ]
      },
      {
        title: "4. Koşullarda Değişiklik",
        content: [
          "Bu kullanım koşullarını dilediğimiz zaman güncelleme hakkımızı saklı tutarız. Değişiklikler web sitesinde yayınlandığı andan itibaren geçerlilik kazanır. Hizmetlerimizi kullanmaya devam etmeniz, güncellenen koşulları kabul ettiğiniz anlamına gelir."
        ]
      }
    ]
  },
  "cookie-policy": {
    id: "cookie-policy",
    title: "Çerez Politikası (Cookie Policy)",
    lastUpdated: "31 Mayıs 2026",
    description: "Web sitemizde kullanıcı deneyimini iyileştirmek amacıyla kullanılan çerezler (cookies) hakkında bilgilendirme.",
    sections: [
      {
        title: "1. Çerez Nedir?",
        content: [
          "Çerezler, bir web sitesini ziyaret ettiğinizde cihazınıza (bilgisayar, tablet veya telefon) yerleştirilen küçük metin dosyalarıdır. Web sitelerinin daha verimli çalışmasını ve kullanıcı tercihlerinin hatırlanmasını sağlarlar."
        ]
      },
      {
        title: "2. Hangi Çerezleri Kullanıyoruz?",
        content: [
          "Zorunlu Çerezler: Web sitesinin temel işlevlerini (sayfa gezintisi, güvenli alanlara erişim vb.) yerine getirebilmesi için gerekli olan teknik çerezlerdir.",
          "Performans ve Analiz Çerezleri: Ziyaretçilerin web sitesini nasıl kullandığını anlamak (hangi sayfaların daha çok ziyaret edildiği gibi) amacıyla anonim veriler toplayan çerezlerdir.",
          "İşlevsel Çerezler: Tercih ettiğiniz dil veya tema (karanlık mod/aydınlık mod) gibi seçimlerinizi hatırlayarak daha kişisel bir deneyim sunmamızı sağlayan çerezlerdir."
        ]
      },
      {
        title: "3. Çerez Tercihlerinizi Nasıl Yönetirsiniz?",
        content: [
          "Çoğu web tarayıcısı çerezleri otomatik olarak kabul eder. Ancak tarayıcı ayarlarınızı değiştirerek çerezleri engelleyebilir veya çerez gönderildiğinde uyarı alabilirsiniz. Çerezlerin engellenmesi, sitemizin bazı özelliklerinin tam olarak çalışmamasına neden olabilir."
        ]
      }
    ]
  },
  "gdpr": {
    id: "gdpr",
    title: "KVKK & GDPR Aydınlatma Metni",
    lastUpdated: "31 Mayıs 2026",
    description: "6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) ve AB Genel Veri Koruma Yönetmeliği (GDPR) kapsamında haklarınız ve yükümlülüklerimiz.",
    sections: [
      {
        title: "1. Veri Sorumlusu",
        content: [
          "6698 sayılı Kişisel Verilerin Korunması Kanunu ('KVKK') ve General Data Protection Regulation ('GDPR') uyarınca, Salev Tech veri sorumlusu sıfatıyla hareket etmektedir.",
          "Veri işleme süreçlerimiz hakkında bilgi almak veya haklarınızı kullanmak için info@salev.tech adresi üzerinden bizimle iletişime geçebilirsiniz."
        ]
      },
      {
        title: "2. Veri İşleme Amaçları ve Hukuki Sebepler",
        content: [
          "Mobil uygulamalarımız ve web sitemiz üzerinde gerçekleştirilen sınırlı veri işleme faaliyetleri aşağıdaki amaçlarla yapılmaktadır:",
          "- Uygulama performansının izlenmesi ve kararlılığın artırılması (Hata raporları),",
          "- Kullanıcı taleplerinin ve teknik destek başvurularının yanıtlanması,",
          "- Kanuni yükümlülüklerimizin yerine getirilmesi.",
          "Bu veriler, KVKK Madde 5 ve GDPR Madde 6'da belirtilen sözleşmenin ifası, veri sorumlusunun meşru menfaatleri veya açık rızanız hukuki sebeplerine dayanılarak işlenmektedir."
        ]
      },
      {
        title: "3. İşlenen Verilerin Aktarılması",
        content: [
          "Toplanan verileriniz, yukarıda belirtilen amaçların gerçekleştirilmesiyle sınırlı olmak üzere, iş ortaklarımıza (örneğin Firebase analitik altyapısı) ve kanunen yetkili kamu kurum ve kuruluşlarına mevzuatın öngördüğü sınırlar çerçevesinde aktarılabilir. Verileriniz hiçbir şekilde reklam veya pazarlama amacıyla üçüncü taraflara satılmaz veya kiralanmaz."
        ]
      },
      {
        title: "4. Haklarınız",
        content: [
          "KVKK Madde 11 ve GDPR Madde 12-23 kapsamında aşağıdaki haklara sahipsiniz:",
          "- Kişisel verilerinizin işlenip işlenmediğini öğrenme,",
          "- İşlenmişse bilgi talep etme,",
          "- İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme,",
          "- Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme,",
          "- Eksik veya yanlış işlenmişse düzeltilmesini isteme,",
          "- Kanuni şartlar çerçevesinde kişisel verilerinizin silinmesini veya yok edilmesini isteme,",
          "- İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme."
        ]
      }
    ]
  }
};
