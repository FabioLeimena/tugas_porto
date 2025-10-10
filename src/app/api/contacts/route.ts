import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const rows = await db.query("SELECT * FROM contacts LIMIT 1");
    if (Array.isArray(rows) && rows.length > 0) return NextResponse.json(rows[0]);
    return NextResponse.json({});
  } catch (err) {
    console.error("GET /api/contacts error:", err);
    return NextResponse.json({ error: "Failed to fetch contacts" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { whatsapp, instagram, email } = await req.json();
    const existing = (await db.query("SELECT * FROM contacts LIMIT 1")) as any[];


    if (Array.isArray(existing) && existing.length > 0) {
      await db.query(
        "UPDATE contacts SET whatsapp=?, instagram=?, email=? WHERE id=?",
        [whatsapp || null, instagram || null, email || null, existing[0].id]
      );
    } else {
      await db.query(
        "INSERT INTO contacts (whatsapp, instagram, email) VALUES (?, ?, ?)",
        [whatsapp || null, instagram || null, email || null]
      );
    }

    return NextResponse.json({ message: "Contacts saved!" });
  } catch (err) {
    console.error("POST /api/contacts error:", err);
    return NextResponse.json({ error: "Failed to save contacts" }, { status: 500 });
  }
}
