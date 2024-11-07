import { conn } from '@/config/db';
import { FieldPacket, QueryResult, RowDataPacket } from 'mysql2';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const db = await conn();
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId');

    const result: [QueryResult, FieldPacket[]] = await db.query(
      `
    select 
        a.id AS uid,
        a.email AS email,
        a.name AS name,
        a.profile_img AS profileImg,
        (SELECT count(*) FROM follows b
        WHERE a.id = b.follow_user_id LIMIT 1) AS followCount ,
        (SELECT count(*) FROM follows b
        WHERE a.id = b.following_user_id LIMIT 1) AS followingCount 
    from users a
    WHERE id = ?
    `,
      [userId],
    );

    const rows = result[0] as RowDataPacket;

    if (!rows) {
      throw new Error();
    }
    return NextResponse.json({
      status: 200,
      message: '유저 정보 조회 성공',
      user: rows[0],
    });
  } catch (err) {
    console.error('유저 정보 조회 도중 에러 발생', err);
  }
}
