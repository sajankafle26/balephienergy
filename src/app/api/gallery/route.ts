import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import GalleryImage from "@/lib/models/GalleryImage";
import { auth } from "@/lib/auth";
import { isValidObjectId, sanitizeString } from "@/lib/security";

export async function GET() {
  try {
    await connectDB();
    const images = await GalleryImage.find().sort({ order: 1 });
    return NextResponse.json(images);
  } catch {
    return NextResponse.json({ error: "Failed to fetch gallery" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    await connectDB();
    const body = await request.json();
    if (!body.url || typeof body.url !== "string") {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }
    const image = await GalleryImage.create({
      url: sanitizeString(body.url, 500),
      caption: sanitizeString(body.caption, 200),
      order: typeof body.order === "number" ? body.order : 0,
    });
    return NextResponse.json(image);
  } catch {
    return NextResponse.json({ error: "Failed to create gallery image" }, { status: 500 });
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
    await GalleryImage.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete gallery image" }, { status: 500 });
  }
}
