import { NextResponse } from "next/server";
import mysql from "mysql2/promise";
import type { RowDataPacket } from "mysql2";
import bcrypt from "bcryptjs";
import { SignJWT, type JWTPayload } from "jose";
import dotenv from "dotenv";

dotenv.config();

interface UserRow extends RowDataPacket {
  id: number;
  email: string;
  password: string;
}

const connectionConfig = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
};

const JWT_SECRET = process.env.JWT_SECRET || "secret_key";

async function generateJWT(payload: JWTPayload) {
  const secret = new TextEncoder().encode(JWT_SECRET);
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1h")
    .sign(secret);
}

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const conn = await mysql.createConnection(connectionConfig);
  const [rows] = await conn.execute<UserRow[]>("SELECT * FROM user WHERE email = ?", [email]);
  await conn.end();

  if (!Array.isArray(rows) || rows.length === 0) {
    return NextResponse.json({ success: false, message: "Email tidak ditemukan" }, { status: 401 });
  }

const user = rows[0];
const valid = await bcrypt.compare(password, user.password);
if (!valid) {
  return NextResponse.json({ success: false, message: "Password salah" }, { status: 401 });
}

const token = await generateJWT({ userId: user.id, email: user.email });
return NextResponse.json({ success: true, token, email: user.email });
}