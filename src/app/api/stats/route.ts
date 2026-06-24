import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Stat from "@/lib/models/Stat";
import { auth } from "@/lib/auth";
import { sanitizeString } from "@/lib/security";

export async function GET() {
  try {
    await connectDB();
    const stats = await Stat.find().sort({ order: 1 });
    return NextResponse.json(stats);
  } catch {
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    await connectDB();
    const { stats } = await request.json();
    if (!Array.isArray(stats)) {
      return NextResponse.json({ error: "Stats must be an array" }, { status: 400 });
    }
    const cleaned = stats.map((s: { value?: string; unit?: string; label?: string; order?: number }) => ({
      value: sanitizeString(s?.value, 50),
      unit: sanitizeString(s?.unit, 20),
      label: sanitizeString(s?.label, 100),
      order: typeof s?.order === "number" ? s.order : 0,
    }));
    await Stat.deleteMany({});
    await Stat.insertMany(cleaned);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to update stats" }, { status: 500 });
  }
}
