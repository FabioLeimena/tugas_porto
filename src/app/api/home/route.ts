import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { writeFile } from "fs/promises";

export async function GET() {
  try {
    const rows = await db.query("SELECT * FROM home_sections LIMIT 1");
    if (Array.isArray(rows) && rows.length > 0) return NextResponse.json(rows[0]);
    return NextResponse.json({});
  } catch (err) {
    console.error("GET /api/home error:", err);
    return NextResponse.json({ error: "Failed to fetch home" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const name = formData.get("name");
    const description = formData.get("description");
    const file = formData.get("profile_image");

    let profile_image: string | null = null;

    if (file && typeof file === "object") {
      const buffer = Buffer.from(await file.arrayBuffer());
      const fileName = Date.now() + "-" + (file as any).name;
      await writeFile(`public/uploads/${fileName}`, buffer);
      profile_image = `/uploads/${fileName}`;
    }

    const existing = (await db.query("SELECT * FROM home_sections LIMIT 1")) as any[];


    if (Array.isArray(existing) && existing.length > 0) {
      await db.query(
        "UPDATE home_sections SET name=?, description=?, profile_image=COALESCE(?, profile_image) WHERE id=?",
        [name, description, profile_image, existing[0].id]
      );
    } else {
      await db.query(
        "INSERT INTO home_sections (name, description, profile_image) VALUES (?, ?, ?)",
        [name, description, profile_image]
      );
    }

    return NextResponse.json({ message: "Home saved!" });
  } catch (err) {
    console.error("POST /api/home error:", err);
    return NextResponse.json({ error: "Failed to save home" }, { status: 500 });
  }
}
