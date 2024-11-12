import { conn } from '@/config/db';
import { FieldPacket, QueryResult, RowDataPacket } from 'mysql2';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const db = await conn();

    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId');
    const { id: feedId } = params;

    if (!feedId) {
      return NextResponse.json(
        { error: '피드 ID가 필요합니다.' },
        { status: 400 },
      );
    }

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
    const feed = result[0] as RowDataPacket;

    if (!feed) {
      return NextResponse.json(
        { error: '피드 게시물이 없습니다.' },
        { status: 404 },
      );
    }

    return NextResponse.json(feed[0], { status: 200 });
  } catch (err) {
    console.error('feed/detail api call Failed : ', err);
    return NextResponse.json({ error: '피드 상세보기 실패' }, { status: 500 });
  }
}
