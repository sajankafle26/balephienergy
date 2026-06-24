import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import ContactSubmission from "@/lib/models/ContactSubmission";
import { auth } from "@/lib/auth";
import { isValidObjectId, sanitizeString, sanitizeEmail } from "@/lib/security";

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    await connectDB();
    const submissions = await ContactSubmission.find().sort({ createdAt: -1 });
    return NextResponse.json(submissions);
  } catch {
    return NextResponse.json({ error: "Failed to fetch submissions" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();

    const name = sanitizeString(body.name, 100);
    const email = sanitizeEmail(body.email);
    const phone = sanitizeString(body.phone, 20);
    const message = sanitizeString(body.message, 2000);

    if (!name) return NextResponse.json({ error: "Name is required" }, { status: 400 });
    if (!email) return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    if (!message) return NextResponse.json({ error: "Message is required" }, { status: 400 });

    const submission = await ContactSubmission.create({ name, email, phone, message });
    return NextResponse.json(submission);
  } catch {
    return NextResponse.json({ error: "Failed to submit contact form" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    await connectDB();
    const { id, read } = await request.json();
    if (!isValidObjectId(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }
    const submission = await ContactSubmission.findByIdAndUpdate(id, { read: Boolean(read) }, { new: true });
    return NextResponse.json(submission);
  } catch {
    return NextResponse.json({ error: "Failed to update submission" }, { status: 500 });
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
    await ContactSubmission.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete submission" }, { status: 500 });
  }
}
