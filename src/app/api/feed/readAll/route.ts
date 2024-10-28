import { FeedData } from '@/types';
import { conn } from '@/utils/db';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const db = await conn();
    const searchParams = request.nextUrl.searchParams;
    const cursor = Number(searchParams.get('cursor'));
    const pageSize = Number(searchParams.get('pageSize'));
    console.log('cursor', cursor, 'pageSize', pageSize);

    const response = await db.query(`
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
          DATE_FORMAT(a.created_at, '%Y-%m-%d') AS createdAt,
          a.updated_at AS updatedAt,
          a.deleted_at AS deletedAt
      FROM feeds a 
      LEFT JOIN images b 
        ON a.id = b.feed_id 
      LEFT JOIN users c
        ON a.user_id = c.id 
      WHERE a.deleted_at is NULL 
      GROUP BY a.id 
      ORDER BY a.created_at DESC`);

    const feeds = response[0] as FeedData[];

    //페이지네이션
    const totalCount = feeds.length;
    const startIndex = (cursor - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedFeeds = feeds.slice(startIndex, endIndex);

    const hasNextPage = endIndex < totalCount;
    const nextCursor = hasNextPage ? cursor + 1 : undefined;

    console.log(totalCount, startIndex, endIndex);

    return NextResponse.json({
      status: 200,
      message: '',
      feeds: paginatedFeeds,
      hasNextPage,
      totalCount,
      nextCursor,
    });
  } catch (err) {
    console.error('피드를 불러오는 도중 에러가 발생했습니다.', err);
    throw new Error();
  }
}
