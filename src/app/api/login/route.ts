import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "secret_key"; // simpan di .env untuk produksi

import type { JWTPayload } from "jose";

async function generateJWT(payload: JWTPayload) {
  const secret = new TextEncoder().encode(JWT_SECRET);
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1h")
    .sign(secret);
}

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json({ success: false, message: "Email tidak ditemukan" }, { status: 401 });
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return NextResponse.json({ success: false, message: "Password salah" }, { status: 401 });
  }

  // Generate JWT token dengan jose
  const token = await generateJWT({ userId: user.id, email: user.email });

  return NextResponse.json({ success: true, token });
}