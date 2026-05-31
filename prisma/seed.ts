import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";
import { androidApps } from "../src/data/apps";
import { promoSlides } from "../src/data/promos";
import * as dotenv from "dotenv";

dotenv.config();

const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://postgres:postgres@localhost:5432/postgres";

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter } as any);

async function main() {
  console.log("Seeding database...");

  // 1. Create Default Admin User
  const adminEmail = "admin@salev.tech";
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash("salevAdmin2026!", 10);
    await prisma.user.create({
      data: {
        email: adminEmail,
        name: "Salih Tanrıseven",
        password: hashedPassword,
      },
    });
    console.log(`- Admin kullanıcısı oluşturuldu: ${adminEmail} (Şifre: salevAdmin2026!)`);
  } else {
    console.log(`- Admin kullanıcısı zaten mevcut.`);
  }

  // 2. Seed Android Apps
  for (const app of androidApps) {
    await prisma.androidApp.upsert({
      where: { id: app.id },
      update: {
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
        minSdk: app.specs.minSdk,
        targetSdk: app.specs.targetSdk,
        architecture: app.specs.architecture,
        permissions: app.specs.permissions,
        changelog: JSON.parse(JSON.stringify(app.changelog)),
      },
      create: {
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
        minSdk: app.specs.minSdk,
        targetSdk: app.specs.targetSdk,
        architecture: app.specs.architecture,
        permissions: app.specs.permissions,
        changelog: JSON.parse(JSON.stringify(app.changelog)),
      },
    });
  }
  console.log(`- ${androidApps.length} adet uygulama verisi tohumlandı/güncellendi.`);

  // 3. Seed Promo Slides
  for (const slide of promoSlides) {
    await prisma.promoSlide.upsert({
      where: { id: slide.id },
      update: {
        badge: slide.badge,
        title: slide.title,
        subtitle: slide.subtitle,
        linkText: slide.linkText,
        linkHref: slide.linkHref,
        bgGradient: slide.bgGradient,
        imageSrc: slide.imageSrc || null,
      },
      create: {
        id: slide.id,
        badge: slide.badge,
        title: slide.title,
        subtitle: slide.subtitle,
        linkText: slide.linkText,
        linkHref: slide.linkHref,
        bgGradient: slide.bgGradient,
        imageSrc: slide.imageSrc || null,
      },
    });
  }
  console.log(`- ${promoSlides.length} adet slayt duyurusu tohumlandı/güncellendi.`);

  console.log("Seeding completed successfully.");
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    pool.end();
  });
