import { conn } from '@/utils/db';
import { FieldPacket, QueryResult, RowDataPacket } from 'mysql2';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const db = await conn();

    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('id');
    console.log('userId => ', userId);
    const result: [QueryResult, FieldPacket[]] = await db.query(
      `SELECT 
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
        FROM  feeds a
        LEFT JOIN images b
            ON a.id = b.feed_id
        WHERE a.user_id = ?
          and a.deleted_at is NULL 
        GROUP BY a.id
        ORDER BY a.created_at DESC`,
      [userId],
    );
    const data = result[0] as RowDataPacket;

    return NextResponse.json({ status: 200, message: '성공', data });
  } catch (err) {
    console.error('readById api call Failed : ', err);
    return NextResponse.json({ status: 500, message: '에러' });
  }
}
