import { NextResponse } from 'next/server';
import { conn } from '@/utils/db';
import { FieldPacket, QueryResult, RowDataPacket } from 'mysql2';

export async function POST(req: Request) {
  try {
    const db = await conn();
    const data = await req.json();
    const { name, profileImgUrl, email } = data;
    console.log('?', name, profileImgUrl, email, data);

    const result: [QueryResult, FieldPacket[]] = await db.query(
      'UPDATE users SET name = ? WHERE email = ?',
      [name, email],
    );

    const rows = result[0] as RowDataPacket;
    console.log('rows', rows);
    if (!rows) {
      return NextResponse.json({ status: 400, message: '실패' });
    }
    // 성공
    return NextResponse.json({ status: 201, message: '성공' });
  } catch (err) {
    console.error(err);
  }
}
