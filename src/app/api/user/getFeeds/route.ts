import { conn } from '@/utils/db';
import { FieldPacket, QueryResult, RowDataPacket } from 'mysql2';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const db = await conn();
    const data = new URL(request.url);
    console.log('user/getFeeds/rout.ts data is? =>', data);
    const userId = data.searchParams.get('userId');
    console.log('user/getFeeds/rout.ts =>', userId);
    const result: [QueryResult, FieldPacket[]] = await db.query(
      `
      SELECT 
        a.id AS id, 
        a.user_id AS userId,
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
      WHERE a.user_id = ?
        AND a.deleted_at is NULL 
      GROUP BY a.id 
      ORDER BY a.created_at DESC
    `,
      [userId],
    );

    const rows = result[0] as RowDataPacket;
    console.log('user/getFeeds/rout.ts row? =>', rows);
    return NextResponse.json({
      status: 200,
      message: '유저 게시글 조회 성공',
      feeds: rows,
    });
  } catch (err) {
    console.error('유저 게시글 조회 도중 에러 발생', err);
  }
}
