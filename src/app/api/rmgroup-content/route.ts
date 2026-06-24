import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import RMGroupContent from "@/lib/models/RMGroupContent";
import { auth } from "@/lib/auth";
import { pick, sanitizeString } from "@/lib/security";

const CONTENT_FIELDS = ["subtitle", "title", "description"] as const;

export async function GET() {
  try {
    await connectDB();
    const content = await RMGroupContent.findOne();
    return NextResponse.json(content);
  } catch {
    return NextResponse.json({ error: "Failed to fetch RM group content" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    await connectDB();
    const body = await request.json();
    const cleaned = pick(body, CONTENT_FIELDS);
    for (const key of CONTENT_FIELDS) {
      if (typeof cleaned[key] === "string") {
        (cleaned as Record<string, unknown>)[key] = sanitizeString(cleaned[key], 500);
      }
    }
    const content = await RMGroupContent.findOne();
    if (content) {
      Object.assign(content, cleaned);
      await content.save();
    } else {
      await RMGroupContent.create(cleaned);
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to update RM group content" }, { status: 500 });
  }
}
