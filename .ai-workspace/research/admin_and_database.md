# Araştırma Raporu - Veritabanı, Kimlik Doğrulama ve Admin Paneli Mimarisi

**Tarih**: 31 Mayıs 2026
**Konu**: salev.tech sitesi için Vercel ile uyumlu veri tabanı, NextAuth (Auth.js) entegrasyonu ve custom admin paneli.

## 1. Veritabanı (Database) Seçenekleri

Vercel üzerinde sorunsuz çalışması için sunucusuz (serverless) çalışan veri tabanları tercih edilmelidir. En uygun adaylar:

| Veritabanı | ORM / Sürücü | Artıları | Eksileri | Karar |
| :--- | :--- | :--- | :--- | :--- |
| **Supabase (PostgreSQL)** | Prisma veya Supabase Client | Ücretsiz katmanı geniş, yerleşik Auth ve Storage (Medya Depolama) sunar, sunucusuz bağlantı havuzuna sahiptir. | Client yapılandırması ekstra bağımlılık gerektirir. | **Önerilen (Birinci Tercih)** |
| **Neon / Vercel Postgres** | Prisma | Vercel ile doğrudan entegre, tam PostgreSQL uyumluluğu. | Medya depolama ve kimlik doğrulama için ek araçlar gerektirir. | Alternatif |
| **MongoDB Atlas** | Mongoose | Esnek JSON şeması (NoSQL), uygulamalar ve slaytlar için esnek alan yönetimi. | İlişkisel verilerde (örneğin kullanıcı-mesaj ilişkisi) zayıftır. | İkinci Tercih |

## 2. Kimlik Doğrulama (Authentication) Seçenekleri

Admin panelinin güvenliği için:
*   **Auth.js (NextAuth.js)**: Next.js App Router ile en uyumlu, veri tabanı oturumları (Database Sessions) ve JWT desteğine sahip endüstri standardı kütüphane.
*   **Clerk**: Hızlı entegre edilir ancak ticari kullanımlarda limitleri vardır ve dışarıya bağımlılığı artırır.

**Karar**: NextAuth.js kullanarak tamamen yerel, güvenli ve veritabanı (Supabase) destekli bir yapı kurmak en sürdürülebilir yöntemdir.

## 3. Admin Paneli Mimari Tasarımı (Custom Dashboard)

Next.js App Router yeteneklerini sonuna kadar kullanmak için dış bir CMS yerine, proje içine entegre edilmiş bir `/admin` rotası tasarlanacaktır.

*   **Güvenlik Katmanı (Data Access Layer - DAL)**:
    - Veritabanı sorgularının yapıldığı fonksiyonlar (`src/data-access/`) JWT oturumunu doğrulamadan işlem yapmayacaktır.
    - Sadece sayfa veya middleware bazlı değil, **veritabanı sorgusu seviyesinde** yetki kontrolü yapılacaktır.
*   **Next.js Server Actions**:
    - Uygulama ekleme/düzenleme, duyuru slaytlarını yönetme ve iletişim kutusundan gelen mesajları okuma işlemleri Server Actions üzerinden yapılacaktır.
    - Tüm girdiler **Zod** şemalarıyla doğrulanacaktır.
*   **Medya Yönetimi (Medya Dosyaları/Logolar)**:
    - Yeni uygulamaların logoları ve ekran görüntüleri Supabase Storage üzerinde depolanacaktır.

## 4. Slayt / Duyuru Bölümü Tasarımı (PromoSlider)

- **Yapı**: Ekstra bir kütüphane kurarak paket boyutunu şişirmek yerine, Next.js optimize çalışan, touch/swipe destekli, otomatik geçişli (autoplay) ve CSS animasyonlu yerel bir React bileşeni (`PromoSlider`) tasarlanacaktır.
- **Yönetilebilirlik**: Duyuru slaytları veritabanında bir tablo olarak tutulacak, admin panelinden anlık olarak eklenip kaldırılabilecektir.
