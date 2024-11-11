import { conn } from '@/config/db';
import {
  FieldPacket,
  QueryResult,
  ResultSetHeader,
  RowDataPacket,
} from 'mysql2';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(request: NextRequest) {
  try {
    const db = await conn();
    const feedId = await request.json();
    console.log(feedId);

    const res: [QueryResult, FieldPacket[]] = await db.query(
      `UPDATE feeds set deleted_at = CURRENT_TIMESTAMP() WHERE id = ?`,
      [feedId],
    );

    // 1. 삭제할 데이터 조회
    const [rows]: [QueryResult, FieldPacket[]] = await db.query(
      `SELECT id AS id, feed_id AS feedId, image_url AS imageUrl, created_at AS createdAt FROM images WHERE feed_id = ?`,
      [feedId],
    );

    // 조회한 데이터를 활용
    console.log('삭제할 데이터:', rows);

    // 이미지 삭제
    await db.query(`DELETE FROM images WHERE feed_id = ?`, [feedId]);

    const result = res[0] as ResultSetHeader;
    if (!result) {
      console.error(`데이터 삭제 실패!`);
    }

    return NextResponse.json({
      status: 200,
      message: '데이터 삭제(업데이트) 완료',
      delImgs: rows,
    });
  } catch (err) {
    console.error('게시글 삭제 도중 에러 발생했습니다.', err);
  }
}
