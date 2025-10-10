import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";

export async function GET() {
  try {
    const rows = await db.query("SELECT * FROM projects ORDER BY id DESC");
    return NextResponse.json(Array.isArray(rows) ? rows : []);
  } catch (err) {
    console.error("GET /api/projects error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const title = formData.get("title");
    const description = formData.get("description");
    const file = formData.get("project_image");

    let imagePath: string | null = null;

    if (file && typeof file === "object") {
      const buffer = Buffer.from(await file.arrayBuffer());
      const fileName = Date.now() + "-" + (file as any).name;
      await writeFile(`public/uploads/projects/${fileName}`, buffer);
      imagePath = `/uploads/projects/${fileName}`;
    }

    await db.query("INSERT INTO projects (title, description, project_image) VALUES (?, ?, ?)", [
      title,
      description,
      imagePath,
    ]);

    return NextResponse.json({ message: "Project added!" });
  } catch (err) {
    console.error("POST /api/projects error:", err);
    return NextResponse.json({ error: "Failed to save project" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID is required" }, { status: 400 });

    await db.query("DELETE FROM projects WHERE id=?", [id]);
    return NextResponse.json({ message: "Project deleted!" });
  } catch (err) {
    console.error("DELETE /api/projects error:", err);
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}
