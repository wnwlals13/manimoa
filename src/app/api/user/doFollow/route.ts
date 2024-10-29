import { conn } from '@/utils/db';
import { FieldPacket, QueryResult, ResultSetHeader } from 'mysql2';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const db = await conn();
    const targetId = await request.json();
    const cookieStore = cookies().get('user');
    const user = JSON.parse(cookieStore?.value as string);

    const result: [QueryResult, FieldPacket[]] = await db.query(
      `
        INSERT INTO follows (follow_user_id, following_user_id) VALUES (?,?) 
        `,
      [user.uid, targetId],
    );

    const rows = result[0] as ResultSetHeader;

    if (!rows) {
      throw new Error();
    }

    return NextResponse.json({
      status: 200,
      message: '팔로우 성공',
    });
  } catch (err) {
    console.error('팔로우 수행 도중 에러 발생', err);
    return NextResponse.json({ status: 500, message: '팔로우 수행 실패' });
  }
}
