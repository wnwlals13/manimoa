import { conn } from '@/utils/db';
import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const db = await conn();
    const feedId = await request.json();
    console.log(feedId);

    const res = await db.query(
      `UPDATE feeds set deleted_at = CURRENT_TIMESTAMP() WHERE id = ?`,
      [feedId],
    );

    // revalidateTag('feed');

    return NextResponse.json({
      status: 200,
      message: '데이터 삭제(업데이트) 완료',
    });
  } catch (err) {
    console.error('게시글 삭제 도중 에러 발생했습니다.', err);
  }
}
