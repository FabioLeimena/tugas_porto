import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const rows = await db.query("SELECT * FROM skills ORDER BY id DESC");
    return NextResponse.json(Array.isArray(rows) ? rows : []);
  } catch (err) {
    console.error("GET /api/skills error:", err);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { skill_name } = await req.json();
    await db.query("INSERT INTO skills (skill_name) VALUES (?)", [skill_name]);
    return NextResponse.json({ message: "Skill added!" });
  } catch (err) {
    console.error("POST /api/skills error:", err);
    return NextResponse.json({ error: "Failed to add skill" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    await db.query("DELETE FROM skills WHERE id=?", [id]);
    return NextResponse.json({ message: "Skill deleted!" });
  } catch (err) {
    console.error("DELETE /api/skills error:", err);
    return NextResponse.json({ error: "Failed to delete skill" }, { status: 500 });
  }
}
