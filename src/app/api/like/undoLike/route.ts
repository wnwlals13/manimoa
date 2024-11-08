import { conn } from '@/config/db';
import { FieldPacket, QueryResult, ResultSetHeader } from 'mysql2';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(request: NextRequest) {
  try {
    const db = await conn();
    const { feedId, userId } = await request.json();

    // 1.좋아요 해제
    const result: [QueryResult, FieldPacket[]] = await db.query(
      `DELETE FROM likes WHERE feed_id = ? AND user_id = ?`,
      [feedId, userId],
    );
    const rows = result[0] as ResultSetHeader;

    // 2.카운트 1 빼기
    const result2: [QueryResult, FieldPacket[]] = await db.query(
      `UPDATE feeds 
      SET like_count = (SELECT COUNT(*) FROM likes where feed_id = ?)
      WHERE id = ?`,
      [feedId, feedId],
    );
    const rows2 = result2[0] as ResultSetHeader;

    if (!rows || !rows2) {
      console.error('좋아요 해제 db 처리에 실패했습니다.');
      throw new Error();
    }

    return NextResponse.json({ status: 200, message: '조아효 해제 성공' });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ status: 500, message: '조아효 해제 실패' });
  }
}
