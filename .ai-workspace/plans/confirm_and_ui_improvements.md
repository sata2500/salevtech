# Görev Planı - Özel AdminModal Entegrasyonu ve Tip Güvenliği İyileştirmeleri

Bu plan, platformun kullanıcı deneyimini ve kod kalitesini artırmaya yönelik iyileştirmeleri kapsar.

## Yol Haritası & İlerleme

- [ ] Özel `AdminModal` Arayüzü Entegrasyonu
  - [ ] `src/components/AdminModal/AdminModal.tsx` oluşturulması
  - [ ] `src/components/AdminModal/AdminModal.module.css` oluşturulması
- [ ] Admin Yönetim Sayfalarının Güncellenmesi
  - [ ] `AdminAppsManager.tsx` dosyasında `confirm` ve `alert` kaldırılıp modal entegre edilmesi
  - [ ] `AdminSlidesManager.tsx` dosyasında `confirm` ve `alert` kaldırılıp modal entegre edilmesi
  - [ ] `AdminMessagesTable.tsx` dosyasında `confirm` ve `alert` kaldırılıp modal entegre edilmesi
- [ ] UI İyileştirmeleri
  - [ ] `PromoSlider.tsx` slayt görsel ikon boyutunun 48px'ten 80px'e çıkarılması
- [ ] Tip Güvenliği İyileştirmeleri
  - [ ] `actions.ts` dosyasındaki `any` parametre tiplerinin Zod şemasıyla güncellenmesi
  - [ ] `messages/page.tsx` dosyasındaki `any[]` tipinin `ContactMessage[]` olarak güncellenmesi
- [ ] Doğrulama ve Derleme
  - [ ] `npm run build` ile yerel derleme kontrolü
  - [ ] Git commit ve GitHub/Vercel dağıtımı
