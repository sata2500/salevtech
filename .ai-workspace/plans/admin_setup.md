# Görev Planı - Vercel Derleme Çözümü, Slayt & Uygulama Yönetimi

Bu plan, derleme hatalarının düzeltilmesini ve Admin panelinin tamamlanmasını hedefler.

## Yol Haritası & İlerleme

- [/] Derleme Hatalarının Çözümü
  - [x] Rotalardaki URL-encoded klasör adlarının düzeltilmesi (`(dashboard)`, `[slug]`, `[...nextauth]`)
  - [ ] CSS `textSet` typo hatalarının düzeltilmesi (`AdminMessagesTable.tsx`, `AdminSlidesManager.tsx`)
  - [ ] `package.json` build scriptine `prisma generate` eklenmesi
- [ ] Slayt Yönetimi Entegrasyonu
  - [ ] `/admin/slides/page.tsx` rotasının oluşturulması (Prisma veri çekme)
- [ ] Uygulamalar Yönetim Ekranı (CRUD)
  - [ ] `AdminAppsManager.tsx` ve `AdminAppsManager.module.css` bileşeninin yazılması (Nested changelog ve lists)
  - [ ] `/admin/apps/page.tsx` rotasının oluşturulması (Prisma veri çekme)
- [ ] Dinamik Veri Akışı
  - [ ] `src/app/page.tsx` ana sayfasının dinamik Prisma sorguları ile beslenmesi (ve static fallback)
  - [ ] `src/app/apps/[slug]/page.tsx` detay sayfasının dinamik yapılması
  - [ ] `PromoSlider.tsx` bileşeninin `initialSlides` prop'u alacak şekilde güncellenmesi
- [ ] Doğrulama ve Derleme
  - [ ] TypeScript ve ESLint denetimleri (`npm run build`)
