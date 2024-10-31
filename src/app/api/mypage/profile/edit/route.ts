import { NextRequest, NextResponse } from 'next/server';
import { conn } from '@/utils/db';
import { FieldPacket, QueryResult, ResultSetHeader } from 'mysql2';

export async function POST(req: NextRequest) {
  try {
    const db = await conn();
    const data = await req.json();

    const result: [QueryResult, FieldPacket[]] = await db.query(
      'UPDATE users SET name = ?, profile_img = ? WHERE users.id = ?',
      [data.name, data.path, data.userId],
    );
    const rows = result[0] as ResultSetHeader;

    if (!rows) {
      return NextResponse.json({
        status: 400,
        message: '실패',
      });
    }
    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      status: 200,
      message: '성공',
      updated: { name: data.name, profileImg: data.path },
    });
  } catch (err) {
    console.error(err);
  }
}
