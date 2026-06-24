import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import AboutContent from "@/lib/models/AboutContent";
import { auth } from "@/lib/auth";
import { pick, sanitizeString } from "@/lib/security";

const ABOUT_FIELDS = ["title", "description", "additionalText", "milestones", "images"] as const;

export async function GET() {
  try {
    await connectDB();
    const about = await AboutContent.findOne().sort({ createdAt: -1 });
    return NextResponse.json(about);
  } catch {
    return NextResponse.json({ error: "Failed to fetch about" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    await connectDB();
    const body = await request.json();
    const cleaned = pick(body, ABOUT_FIELDS);
    if (typeof cleaned.title === "string") cleaned.title = sanitizeString(cleaned.title, 200);
    if (typeof cleaned.description === "string") cleaned.description = sanitizeString(cleaned.description, 5000);
    if (typeof cleaned.additionalText === "string") cleaned.additionalText = sanitizeString(cleaned.additionalText, 5000);
    if (Array.isArray(cleaned.milestones)) {
      cleaned.milestones = cleaned.milestones.map((m: { text?: string; date?: string }) => ({
        text: sanitizeString(m?.text, 200),
        date: sanitizeString(m?.date, 50),
      }));
    }
    const about = await AboutContent.findOne().sort({ createdAt: -1 });
    if (about) {
      Object.assign(about, cleaned);
      await about.save();
    } else {
      await AboutContent.create(cleaned);
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to update about" }, { status: 500 });
  }
}
