import { conn } from '@/config/db';
import { ResultSetHeader } from 'mysql2';
import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const db = await conn();
    const { content, writer, feedId } = await request.json();

    const res = await db.query(
      `INSERT INTO comments (feed_id, user_id,content,parent_comment_id) VALUES (?,?,?,null)`,
      [feedId, writer, content],
    );
    const result = res[0] as ResultSetHeader;

    if (!result) {
      return NextResponse.json({ status: 500, message: '추가 실패' });
    }

    await db.query(
      `UPDATE feeds SET comment_count = comment_count + 1 WHERE id = ?`,
      [feedId],
    );

    revalidateTag('comment');

    return NextResponse.json({ status: 200, message: '추가 성공' });
  } catch (err) {
    console.error('댓글 추가에 실패했습니다.', err);
  }
}
