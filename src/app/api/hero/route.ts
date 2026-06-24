import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import HeroSection from "@/lib/models/HeroSection";
import { auth } from "@/lib/auth";
import { pick, sanitizeString } from "@/lib/security";

const HERO_FIELDS = ["title", "titleHighlight", "subtitle", "ctaText", "ctaLink", "image", "pdfUrl"] as const;

export async function GET() {
  try {
    await connectDB();
    const hero = await HeroSection.findOne().sort({ createdAt: -1 });
    return NextResponse.json(hero);
  } catch {
    return NextResponse.json({ error: "Failed to fetch hero" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    await connectDB();
    const body = await request.json();
    const cleaned = pick(body, HERO_FIELDS);
    for (const key of HERO_FIELDS) {
      if (typeof cleaned[key] === "string") {
        (cleaned as Record<string, unknown>)[key] = sanitizeString(cleaned[key], 500);
      }
    }
    const hero = await HeroSection.findOne().sort({ createdAt: -1 });
    if (hero) {
      Object.assign(hero, cleaned);
      await hero.save();
    } else {
      await HeroSection.create(cleaned);
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to update hero" }, { status: 500 });
  }
}
