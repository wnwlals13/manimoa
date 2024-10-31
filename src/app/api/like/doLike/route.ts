import { conn } from '@/utils/db';
import { FieldPacket, QueryResult, ResultSetHeader } from 'mysql2';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const db = await conn();
    const { feedId, userId } = await request.json();
    console.log(`feedId =>`, feedId);

    // 1.좋아요
    const result: [QueryResult, FieldPacket[]] = await db.query(
      `INSERT INTO likes (feed_id, user_id) VALUES (?,?)`,
      [feedId, userId],
    );
    const rows = result[0] as ResultSetHeader;

    // 2.카운트 1증가
    const result2: [QueryResult, FieldPacket[]] = await db.query(
      `UPDATE feeds SET like_count = like_count + 1 WHERE id = ?`,
      [feedId],
    );
    const rows2 = result2[0] as ResultSetHeader;

    if (!rows || !rows2) {
      console.error('좋아요 db 처리에 실패했습니다.');
      throw new Error();
    }

    return NextResponse.json({ status: 200, message: '조아효 성공' });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ status: 500, message: '조아효 실패' });
  }
}
