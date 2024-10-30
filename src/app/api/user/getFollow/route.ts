import { conn } from '@/utils/db';
import { FieldPacket, QueryResult, RowDataPacket } from 'mysql2';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const db = await conn();
    const cookieStore = cookies().get('user');
    const user = JSON.parse(cookieStore?.value as string);
    const searchParams = request.nextUrl.searchParams;
    const targetId = searchParams.get('targetId');

    const result: [QueryResult, FieldPacket[]] = await db.query(
      `
        SELECT * FROM follows WHERE follow_user_id = ? AND following_user_id = ?
    `,
      [user.uid, targetId],
    );

    const rows = result[0] as RowDataPacket;

    // 없으면 팔로우관계 아니고 있으면 팔로우관계
    const isFriend = rows.length > 0 ? true : false;

    return NextResponse.json({
      status: 200,
      message: '팔로우 여부 조회 성공',
      isFriend,
    });
  } catch (err) {
    console.error('팔로우 여부 db 조회 도중 에러 발생', err);
    return NextResponse.json({ status: 500, message: '팔로우 여부 조회 실패' });
  }
}
