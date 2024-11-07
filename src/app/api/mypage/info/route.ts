import { conn } from '@/config/db';
import { FieldPacket, QueryResult, RowDataPacket } from 'mysql2';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const db = await conn();
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('q');

    const res: [QueryResult, FieldPacket[]] = await db.query(
      `SELECT id, email, password, name, profile_img FROM users WHERE id = ?`,
      [id],
    );
    const rows = res[0] as RowDataPacket;

    if (rows) {
      return NextResponse.json({
        status: 201,
        message: '조회 성공',
        data: rows[0],
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      });
    } else {
      return NextResponse.next();
    }
  } catch (err) {
    console.error(err);
  }
}
