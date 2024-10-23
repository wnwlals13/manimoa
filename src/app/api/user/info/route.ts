import { conn } from '@/utils/db';
import { FieldPacket, QueryResult, RowDataPacket } from 'mysql2';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const db = await conn();
    const data = new URL(request.url);
    const id = data.searchParams.get('q');

    const res: [QueryResult, FieldPacket[]] = await db.query(
      `SELECT id, email, password, name, profile_img FROM users WHERE email = ?`,
      [id],
    );
    const rows = res[0] as RowDataPacket;

    return NextResponse.json({
      status: 201,
      message: '조회 성공',
      data: rows[0],
    });
  } catch (err) {
    console.error(err);
  }
}
