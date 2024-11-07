import { conn } from '@/config/db';
import { FieldPacket, QueryResult, RowDataPacket } from 'mysql2';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const db = await conn();

    const searchParams = request.nextUrl.searchParams;
    const feedId = searchParams.get('id');
    const userId = searchParams.get('userId');

    const result: [QueryResult, FieldPacket[]] = await db.query(
      `
       SELECT 
          a.id AS id, 
          a.user_id AS userId,
          c.name  AS userName,
          c.profile_img  AS profileImg,
          a.content AS content,
          a.price AS price,
          a.price_option AS priceOption,
          GROUP_CONCAT(b.image_url) AS images,
          a.like_count AS likeCount, 
          a.comment_count AS commentCount,
          a.created_at AS createdAt,
          a.updated_at AS updatedAt,
          a.deleted_at AS deletedAt,
          IF(count(d.id)>0, 1, 0 ) as isUserDoLike
      FROM  feeds a
      LEFT JOIN images b
          ON a.id = b.feed_id
      LEFT JOIN users c
        ON a.user_id = c.id
      LEFT JOIN likes d
            on a.id  = d.feed_id AND d.user_id = ?
      WHERE a.id = ?
    `,
      [userId, feedId],
    );
    const rows = result[0] as RowDataPacket;

    return NextResponse.json({
      status: 200,
      message: '상세보기 성공',
      feed: rows,
    });
  } catch (err) {
    console.error('feed/detail api call Failed : ', err);
    return NextResponse.json({ status: 500, message: '에러' });
  }
}
