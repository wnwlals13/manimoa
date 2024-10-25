import { conn } from '@/utils/db';
import { FieldPacket, QueryResult, ResultSetHeader } from 'mysql2';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const db = await conn();
    const req = await request.json();
    const cookieStore = cookies().get('user');
    const user = JSON.parse(cookieStore?.value as string);
    console.log('datas =>', req, 'user=>', user);

    const option = !req.priceOption ? 0 : 1;

    // 피드 콘텐츠 추가
    const firstResponse: [QueryResult, FieldPacket[]] = await db.query(
      `INSERT INTO feeds (user_id, content, price, price_option) VALUES (?,?,?,?)`,
      [user.uid, req.content, req.price, option],
    );
    const first = firstResponse[0] as ResultSetHeader;

    const feedId = first.insertId;
    const imgUrls = req.paths;

    // 피드 이미지 추가
    if (imgUrls) {
      imgUrls.forEach(async (url: string) => {
        await db.query(`INSERT INTO images (feed_id, image_url) VALUES (?,?)`, [
          feedId,
          url,
        ]);
      });
    }

    revalidateTag('feed');

    return NextResponse.json({ status: 201, message: '조회 성공' });
  } catch (err) {
    console.error('upload api 과정 도중 에러 발생', err);
    throw new Error();
  }
}
