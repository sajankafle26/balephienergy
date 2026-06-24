import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import TeamMember from "@/lib/models/TeamMember";
import { auth } from "@/lib/auth";
import { isValidObjectId, sanitizeString, pick } from "@/lib/security";

const MEMBER_FIELDS = ["name", "role", "category", "bio", "image", "order"] as const;

export async function GET() {
  try {
    await connectDB();
    const members = await TeamMember.find().sort({ order: 1 });
    return NextResponse.json(members);
  } catch {
    return NextResponse.json({ error: "Failed to fetch team" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    await connectDB();
    const body = await request.json();
    const cleaned = pick(body, MEMBER_FIELDS);
    if (typeof cleaned.name !== "string" || !cleaned.name.trim()) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    if (typeof cleaned.role !== "string" || !cleaned.role.trim()) {
      return NextResponse.json({ error: "Role is required" }, { status: 400 });
    }
    cleaned.name = sanitizeString(cleaned.name, 100);
    cleaned.role = sanitizeString(cleaned.role, 150);
    cleaned.bio = sanitizeString(cleaned.bio, 1000);
    cleaned.image = sanitizeString(cleaned.image, 500);
    if (cleaned.category !== "board" && cleaned.category !== "management") cleaned.category = "board";
    if (typeof cleaned.order !== "number") cleaned.order = 0;
    const member = await TeamMember.create(cleaned);
    return NextResponse.json(member);
  } catch {
    return NextResponse.json({ error: "Failed to create team member" }, { status: 500 });
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
    const cleaned = pick(updateData, MEMBER_FIELDS);
    if (typeof cleaned.name === "string") cleaned.name = sanitizeString(cleaned.name, 100);
    if (typeof cleaned.role === "string") cleaned.role = sanitizeString(cleaned.role, 150);
    if (typeof cleaned.bio === "string") cleaned.bio = sanitizeString(cleaned.bio, 1000);
    if (typeof cleaned.image === "string") cleaned.image = sanitizeString(cleaned.image, 500);
    const member = await TeamMember.findByIdAndUpdate(_id, cleaned, { new: true });
    return NextResponse.json(member);
  } catch {
    return NextResponse.json({ error: "Failed to update team member" }, { status: 500 });
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
    await TeamMember.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete team member" }, { status: 500 });
  }
}
