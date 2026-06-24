import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import ProjectDetail from "@/lib/models/ProjectDetail";
import { auth } from "@/lib/auth";
import { pick, sanitizeString } from "@/lib/security";

const PROJECT_FIELDS = ["projectName", "features", "status", "completedItems", "inProgressItems", "siteAccess", "route", "pdfUrl"] as const;

export async function GET() {
  try {
    await connectDB();
    const project = await ProjectDetail.findOne().sort({ createdAt: -1 });
    return NextResponse.json(project);
  } catch {
    return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    await connectDB();
    const body = await request.json();
    const cleaned = pick(body, PROJECT_FIELDS);
    if (typeof cleaned.projectName === "string") cleaned.projectName = sanitizeString(cleaned.projectName, 200);
    if (typeof cleaned.status === "string") cleaned.status = sanitizeString(cleaned.status, 100);
    if (typeof cleaned.siteAccess === "string") cleaned.siteAccess = sanitizeString(cleaned.siteAccess, 500);
    if (typeof cleaned.route === "string") cleaned.route = sanitizeString(cleaned.route, 500);
    if (typeof cleaned.pdfUrl === "string") cleaned.pdfUrl = sanitizeString(cleaned.pdfUrl, 500);
    if (Array.isArray(cleaned.features)) {
      cleaned.features = cleaned.features.map((f: { key?: string; value?: string }) => ({
        key: sanitizeString(f?.key, 100),
        value: sanitizeString(f?.value, 200),
      }));
    }
    if (Array.isArray(cleaned.completedItems)) {
      cleaned.completedItems = cleaned.completedItems.map((i: unknown) => sanitizeString(i, 200));
    }
    if (Array.isArray(cleaned.inProgressItems)) {
      cleaned.inProgressItems = cleaned.inProgressItems.map((i: unknown) => sanitizeString(i, 200));
    }
    const project = await ProjectDetail.findOne().sort({ createdAt: -1 });
    if (project) {
      Object.assign(project, cleaned);
      await project.save();
    } else {
      await ProjectDetail.create(cleaned);
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}
