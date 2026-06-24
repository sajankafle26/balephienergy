import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import SiteSettings from "@/lib/models/SiteSettings";
import { auth } from "@/lib/auth";
import { pick, sanitizeString } from "@/lib/security";

const SETTINGS_FIELDS = ["phone", "email", "headOffice", "siteOffice", "website", "facebook", "copyright", "logo", "favicon"] as const;

export async function GET() {
  try {
    await connectDB();
    const settings = await SiteSettings.findOne();
    return NextResponse.json(settings);
  } catch {
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    await connectDB();
    const body = await request.json();
    const cleaned = pick(body, SETTINGS_FIELDS);
    for (const key of SETTINGS_FIELDS) {
      if (typeof cleaned[key] === "string") {
        (cleaned as Record<string, unknown>)[key] = sanitizeString(cleaned[key], 500);
      }
    }
    const settings = await SiteSettings.findOne();
    if (settings) {
      Object.assign(settings, cleaned);
      await settings.save();
    } else {
      await SiteSettings.create(cleaned);
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}
