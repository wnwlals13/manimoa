import { conn } from '@/config/db';
import { FieldPacket, QueryResult, ResultSetHeader } from 'mysql2';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(request: NextRequest) {
  try {
    const db = await conn();
    const { targetId, userId } = await request.json();

    const result: [QueryResult, FieldPacket[]] = await db.query(
      `
         DELETE FROM follows WHERE follow_user_id = ? AND following_user_id = ?
        `,
      [userId, targetId],
    );

    const rows = result[0] as ResultSetHeader;

    if (!rows) {
      throw new Error();
    }

    return NextResponse.json({
      status: 200,
      message: '팔로우 취소 성공',
    });
  } catch (err) {
    console.error('팔로우 취소 수행 도중 에러 발생', err);
    return NextResponse.json({ status: 500, message: '팔로우 수행 실패' });
  }
}
