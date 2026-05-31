# Görev Planı - Slayt Bileşeni ve Admin Paneli Geliştirmesi

## Mevcut Odak
* Ana sayfa üst kısmına dinamik ve şık bir duyuru/slayt bileşeni (`PromoSlider`) eklemek.
* Sitenin veri tabanı, NextAuth (Auth.js) ve admin paneli `/admin` için detaylı planlama ve altyapı hazırlığı yapmak.

## Yol Haritası & İlerleme

- [ ] Slayt / Duyuru Alanı (`PromoSlider`)
  - [ ] `PromoSlider` veri yapısının ve mock duyuruların hazırlanması
  - [ ] `PromoSlider.tsx` ve `PromoSlider.module.css` bileşeninin yazılması (Vanilla CSS, cam efekti, otomatik geçiş, mobil uyum)
  - [ ] Slayt alanının `src/app/page.tsx` içerisine entegre edilmesi
- [ ] Veritabanı ve Kimlik Doğrulama Altyapısı
  - [ ] Supabase PostgreSQL veri tabanının kurulması
  - [ ] Prisma ORM kurulumu ve şemaların (`User`, `App`, `PromoSlide`, `Message`) oluşturulması
  - [ ] NextAuth.js (Auth.js) yapılandırması (Credentials provider, Session ve JWT yönetimi)
- [ ] Admin Paneli Tasarımı (`/admin`)
  - [ ] Giriş Sayfası (`/admin/login`) tasarımı ve NextAuth bağlantısı
  - [ ] Admin Dashboard yerleşimi (İstatistik paneli, responsive yan menü)
  - [ ] Uygulamalar Yönetim Ekranı (CRUD arayüzü)
  - [ ] Slayt / Duyuru Yönetim Ekranı
  - [ ] Gelen İletişim Mesajları Görüntüleme Paneli
- [ ] İş mantığı & Server Actions
  - [ ] Veri Erişim Katmanı (Data Access Layer - DAL) ve oturum koruma kontrollerinin yazılması
  - [ ] Uygulama ve Slayt ekleme/güncelleme/silme Server Action fonksiyonlarının yazılması (Zod doğrulamaları dahil)
  - [ ] Medya yükleme (Image Upload) için Supabase Storage entegrasyonu
- [ ] Doğrulama ve Derleme
  - [ ] TypeScript ve ESLint denetimlerinin yapılması
  - [ ] Vercel derleme simülasyonu (`npm run build`)
