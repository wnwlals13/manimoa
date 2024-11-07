import { conn } from '@/config/db';
import { ResultSetHeader } from 'mysql2';
import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const db = await conn();

    const { content, commentId } = await request.json();

    const res = await db.query(`UPDATE comments SET content = ? WHERE id = ?`, [
      content,
      commentId,
    ]);

    const result = res[0] as ResultSetHeader;

    if (!result) {
      throw new Error();
    }

    revalidateTag('comment');

    return NextResponse.json({ status: 200, message: '수정 성공' });
  } catch (err) {
    console.error('댓글 수정에 실패했습니다.', err);
  }
}
