import { conn } from '@/utils/db';
import { FieldPacket, QueryResult, ResultSetHeader } from 'mysql2';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const db = await conn();
    const data = await request.json();
    const cookieStore = cookies().get('user');
    const user = JSON.parse(cookieStore?.value as string);
    const feedId = data.feedId;
    const delPaths = data.delPaths;
    const paths = data.paths;

    console.log(data);
    // 이미지 삭제
    if (delPaths.length > 0) {
      Promise.all(
        delPaths.forEach(async (path: string) => {
          const res: [QueryResult, FieldPacket[]] = await db.query(
            `DELETE FROM images WHERE image_url = ? and feed_id = ?`,
            [path, feedId],
          );
        }),
      ).catch((err) => {
        console.error('이미지 다중 삭제 도중 에러 발생', err);
      });
    }

    // 이미지 추가
    if (paths.length > 0) {
      Promise.all(
        paths.forEach(async (url: string) => {
          await db.query(
            `INSERT INTO images (feed_id, image_url) VALUES (?,?)`,
            [feedId, url],
          );
        }),
      ).catch((err) => {
        console.error('이미지 다중 추가 도중 에러 발생', err);
      });
    }

    // 콘텐츠 수정
    const option = !data.priceOption ? 0 : 1;
    const res: [QueryResult, FieldPacket[]] = await db.query(
      `UPDATE feeds SET content = ?, price = ?, price_option= ?, updated_at = CURRENT_TIMESTAMP() WHERE id = ?`,
      [data.content, data.price, option, feedId],
    );
    const first = res[0] as ResultSetHeader;

    if (!first) {
      console.error('콘텐츠 수정 도중 에러 발생', first);
    }

    revalidateTag('feed');

    return NextResponse.json({ status: 200, message: '성공' });
  } catch (err) {
    console.error('게시글 수정 도중 에러 발생했습니다.', err);
    return NextResponse.json({ status: 500, message: '실패' });
  }
}
