import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { androidApps as staticApps } from "@/data/apps";

export async function GET() {
  try {
    const apps = await prisma.androidApp.findMany({
      select: { id: true, slug: true, title: true },
      orderBy: { createdAt: "asc" },
    });
    const data = apps.length > 0
      ? apps
      : staticApps.map((a) => ({ id: a.id, slug: a.slug, title: a.title }));

    return NextResponse.json(data);
  } catch {
    const data = staticApps.map((a) => ({ id: a.id, slug: a.slug, title: a.title }));
    return NextResponse.json(data);
  }
}
