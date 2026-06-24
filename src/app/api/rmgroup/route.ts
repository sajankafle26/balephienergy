import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import RMGroupProject from "@/lib/models/RMGroupProject";
import { auth } from "@/lib/auth";
import { isValidObjectId, sanitizeString, pick } from "@/lib/security";

const RM_FIELDS = ["category", "name", "capacity", "description", "highlighted", "order"] as const;
const VALID_CATEGORIES = ["revenue", "construction", "study", "upcoming"];

export async function GET() {
  try {
    await connectDB();
    const projects = await RMGroupProject.find().sort({ order: 1 });
    return NextResponse.json(projects);
  } catch {
    return NextResponse.json({ error: "Failed to fetch RM group projects" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    await connectDB();
    const body = await request.json();
    const cleaned = pick(body, RM_FIELDS);
    if (typeof cleaned.name !== "string" || !cleaned.name.trim()) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    cleaned.name = sanitizeString(cleaned.name, 200);
    cleaned.capacity = sanitizeString(cleaned.capacity, 50);
    cleaned.description = sanitizeString(cleaned.description, 500);
    if (!VALID_CATEGORIES.includes(cleaned.category as string)) cleaned.category = "study";
    if (typeof cleaned.highlighted !== "boolean") cleaned.highlighted = false;
    if (typeof cleaned.order !== "number") cleaned.order = 0;
    const project = await RMGroupProject.create(cleaned);
    return NextResponse.json(project);
  } catch {
    return NextResponse.json({ error: "Failed to create RM group project" }, { status: 500 });
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
    const cleaned = pick(updateData, RM_FIELDS);
    if (typeof cleaned.name === "string") cleaned.name = sanitizeString(cleaned.name, 200);
    if (typeof cleaned.capacity === "string") cleaned.capacity = sanitizeString(cleaned.capacity, 50);
    if (typeof cleaned.description === "string") cleaned.description = sanitizeString(cleaned.description, 500);
    if (cleaned.category && !VALID_CATEGORIES.includes(cleaned.category as string)) delete cleaned.category;
    const project = await RMGroupProject.findByIdAndUpdate(_id, cleaned, { new: true });
    return NextResponse.json(project);
  } catch {
    return NextResponse.json({ error: "Failed to update RM group project" }, { status: 500 });
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
    await RMGroupProject.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete RM group project" }, { status: 500 });
  }
}
