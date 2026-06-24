import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Download from "@/lib/models/Download";
import { auth } from "@/lib/auth";
import { isValidObjectId, sanitizeString, pick } from "@/lib/security";

const VALID_CATEGORIES = ["brochure", "news", "reports", "agm", "share-form", "policies"];
const DOWNLOAD_FIELDS = ["title", "category", "fileUrl", "description", "order"] as const;

export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    const filter: Record<string, unknown> = {};
    if (category && VALID_CATEGORIES.includes(category)) {
      filter.category = category;
    }

    const downloads = await Download.find(filter).sort({ order: 1, createdAt: -1 });
    return NextResponse.json(downloads);
  } catch {
    return NextResponse.json({ error: "Failed to fetch downloads" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    await connectDB();
    const body = await request.json();
    const cleaned = pick(body, DOWNLOAD_FIELDS);

    if (typeof cleaned.title !== "string" || !cleaned.title.trim()) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }
    if (typeof cleaned.fileUrl !== "string" || !cleaned.fileUrl.trim()) {
      return NextResponse.json({ error: "File URL is required" }, { status: 400 });
    }
    if (!cleaned.category || !VALID_CATEGORIES.includes(cleaned.category as string)) {
      return NextResponse.json({ error: "Valid category is required" }, { status: 400 });
    }

    cleaned.title = sanitizeString(cleaned.title, 200);
    cleaned.fileUrl = sanitizeString(cleaned.fileUrl, 500);
    cleaned.description = sanitizeString(cleaned.description, 500);
    if (typeof cleaned.order !== "number") cleaned.order = 0;

    const download = await Download.create(cleaned);
    return NextResponse.json(download);
  } catch {
    return NextResponse.json({ error: "Failed to create download" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    await connectDB();
    const { _id, ...updateData } = await request.json();
    if (!isValidObjectId(_id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }
    const cleaned = pick(updateData, DOWNLOAD_FIELDS);
    if (typeof cleaned.title === "string") cleaned.title = sanitizeString(cleaned.title, 200);
    if (typeof cleaned.fileUrl === "string") cleaned.fileUrl = sanitizeString(cleaned.fileUrl, 500);
    if (typeof cleaned.description === "string") cleaned.description = sanitizeString(cleaned.description, 500);
    if (cleaned.category && !VALID_CATEGORIES.includes(cleaned.category as string)) delete cleaned.category;
    const download = await Download.findByIdAndUpdate(_id, cleaned, { new: true });
    return NextResponse.json(download);
  } catch {
    return NextResponse.json({ error: "Failed to update download" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    await connectDB();
    const { id } = await request.json();
    if (!isValidObjectId(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }
    await Download.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete download" }, { status: 500 });
  }
}
