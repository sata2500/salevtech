"use server";

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

// Helper authentication check
async function checkAuth() {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Yetkisiz erişim! Lütfen oturum açın.");
  }
  return session;
}

// ----------------------------------------------------
// Validation Schemas
// ----------------------------------------------------
const appSchema = z.object({
  id: z.string().min(3),
  slug: z.string().min(3),
  title: z.string().min(2),
  tagline: z.string().min(5),
  description: z.string().min(10),
  longDescription: z.string().min(20),
  iconGradient: z.string().min(10),
  iconSvg: z.string().min(10),
  version: z.string().min(1),
  size: z.string().min(1),
  releaseDate: z.string().min(1),
  playStoreUrl: z.string().url(),
  apkUrl: z.string(),
  category: z.string().min(2),
  accentColor: z.string().min(4),
  features: z.array(z.string()),
  minSdk: z.string().min(2),
  targetSdk: z.string().min(2),
  architecture: z.string().min(2),
  permissions: z.array(z.string()),
  changelog: z.array(z.object({
    version: z.string(),
    date: z.string(),
    notes: z.array(z.string())
  }))
});

const slideSchema = z.object({
  badge: z.string().min(2),
  title: z.string().min(2),
  subtitle: z.string().min(10),
  linkText: z.string().min(2),
  linkHref: z.string().min(1),
  bgGradient: z.string().min(10),
  imageSrc: z.string().optional().nullable()
});

export type AppInput = z.infer<typeof appSchema>;
export type SlideInput = z.infer<typeof slideSchema>;

// ----------------------------------------------------
// Android Apps Actions
// ----------------------------------------------------
export async function createAppAction(formData: AppInput) {
  await checkAuth();
  
  const validated = appSchema.parse(formData);
  
  await prisma.androidApp.create({
    data: {
      ...validated,
      changelog: JSON.parse(JSON.stringify(validated.changelog)) // ensure JSON compatibility
    }
  });

  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/admin/apps");
  return { success: true };
}

export async function updateAppAction(id: string, formData: AppInput) {
  await checkAuth();
  
  const validated = appSchema.parse(formData);
  
  await prisma.androidApp.update({
    where: { id },
    data: {
      ...validated,
      changelog: JSON.parse(JSON.stringify(validated.changelog))
    }
  });

  revalidatePath("/");
  revalidatePath(`/apps/${validated.slug}`);
  revalidatePath("/admin");
  revalidatePath("/admin/apps");
  return { success: true };
}

export async function deleteAppAction(id: string) {
  await checkAuth();
  
  await prisma.androidApp.delete({
    where: { id }
  });

  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/admin/apps");
  return { success: true };
}

// ----------------------------------------------------
// Promo Slides Actions
// ----------------------------------------------------
export async function createSlideAction(formData: SlideInput) {
  await checkAuth();
  
  const validated = slideSchema.parse(formData);
  
  await prisma.promoSlide.create({
    data: validated
  });

  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/admin/slides");
  return { success: true };
}

export async function updateSlideAction(id: string, formData: SlideInput) {
  await checkAuth();
  
  const validated = slideSchema.parse(formData);
  
  await prisma.promoSlide.update({
    where: { id },
    data: validated
  });

  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/admin/slides");
  return { success: true };
}

export async function deleteSlideAction(id: string) {
  await checkAuth();
  
  await prisma.promoSlide.delete({
    where: { id }
  });

  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/admin/slides");
  return { success: true };
}

// ----------------------------------------------------
// Messages Actions
// ----------------------------------------------------
export async function markMessageAsReadAction(id: string, read: boolean) {
  await checkAuth();
  
  await prisma.contactMessage.update({
    where: { id },
    data: { read }
  });

  revalidatePath("/admin");
  revalidatePath("/admin/messages");
  return { success: true };
}

export async function deleteMessageAction(id: string) {
  await checkAuth();
  
  await prisma.contactMessage.delete({
    where: { id }
  });

  revalidatePath("/admin");
  revalidatePath("/admin/messages");
  return { success: true };
}

// ----------------------------------------------------
// Public Contact Form Submission Action (No Auth required)
// ----------------------------------------------------
const publicMessageSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10)
});

export async function submitContactMessageAction(formData: { name: string; email: string; message: string }) {
  const validated = publicMessageSchema.parse(formData);
  
  await prisma.contactMessage.create({
    data: {
      name: validated.name,
      email: validated.email,
      message: validated.message,
      read: false
    }
  });

  revalidatePath("/admin");
  return { success: true };
}
