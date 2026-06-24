import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import ChairmanMessage from "@/lib/models/ChairmanMessage";
import { auth } from "@/lib/auth";
import { pick, sanitizeString } from "@/lib/security";

const CHAIRMAN_FIELDS = ["name", "title", "message", "image"] as const;

export async function GET() {
  try {
    await connectDB();
    const chairman = await ChairmanMessage.findOne().sort({ createdAt: -1 });
    return NextResponse.json(chairman);
  } catch {
    return NextResponse.json({ error: "Failed to fetch chairman" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    await connectDB();
    const body = await request.json();
    const cleaned = pick(body, CHAIRMAN_FIELDS);
    for (const key of CHAIRMAN_FIELDS) {
      if (typeof cleaned[key] === "string") {
        (cleaned as Record<string, unknown>)[key] = sanitizeString(cleaned[key], 500);
      }
    }
    const chairman = await ChairmanMessage.findOne().sort({ createdAt: -1 });
    if (chairman) {
      Object.assign(chairman, cleaned);
      await chairman.save();
    } else {
      await ChairmanMessage.create(cleaned);
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to update chairman" }, { status: 500 });
  }
}
