import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import NavigationMenu from "@/lib/models/NavigationMenu";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    await connectDB();
    const menu = await NavigationMenu.findOne();
    return NextResponse.json(menu);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch menu" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    await connectDB();
    const body = await request.json();
    const menu = await NavigationMenu.findOne();
    if (menu) {
      menu.items = body.items;
      await menu.save();
    } else {
      await NavigationMenu.create({ items: body.items });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update menu" }, { status: 500 });
  }
}
