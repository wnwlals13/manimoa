import { conn } from '@/config/db';
import { ResultSetHeader } from 'mysql2';
import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(request: NextRequest) {
  try {
    const db = await conn();
    const { commentId, feedId } = await request.json();

    const res = await db.query(
      `UPDATE comments SET deleted_at = CURRENT_TIMESTAMP() WHERE id = ?`,
      [commentId],
    );
    const result = res[0] as ResultSetHeader;

    const res2 = await db.query(
      `UPDATE feeds SET comment_count = GREATEST(comment_count - 1, 0) WHERE id = ?`,
      [feedId],
    );

    if (!res2) {
      throw new Error();
    }

    if (!result) {
      throw new Error();
    }

    revalidateTag('comment');

    return NextResponse.json({ status: 200, message: '삭제 성공' });
  } catch (err) {
    console.error('댓글 삭제 실패했습니다.', err);
  }
}
