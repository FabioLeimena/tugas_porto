import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const rows = await db.query("SELECT * FROM about_sections LIMIT 1");
    if (Array.isArray(rows) && rows.length > 0) return NextResponse.json(rows[0]);
    return NextResponse.json({});
  } catch (err) {
    console.error("GET /api/about error:", err);
    return NextResponse.json({ error: "Failed to fetch about" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { about_text } = await req.json();
    const existing = (await db.query("SELECT * FROM about_sections LIMIT 1")) as any[];

    if (Array.isArray(existing) && existing.length > 0) {
      await db.query("UPDATE about_sections SET about_text=? WHERE id=?", [about_text, existing[0].id]);
    } else {
      await db.query("INSERT INTO about_sections (about_text) VALUES (?)", [about_text]);
    }

    return NextResponse.json({ message: "About saved!" });
  } catch (err) {
    console.error("POST /api/about error:", err);
    return NextResponse.json({ error: "Failed to save about" }, { status: 500 });
  }
}
