import { FeedData } from '@/types';
import { conn } from '@/config/db';
import { FieldPacket, QueryResult } from 'mysql2';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const db = await conn();
    const searchParams = request.nextUrl.searchParams;
    const feedId = searchParams.get('id');
    const cursor = Number(searchParams.get('cursor'));
    const pageSize = Number(searchParams.get('pageSize'));

    const tag = request.nextUrl.searchParams.get('comment');
    console.log('tag =>', tag, searchParams);

    const result: [QueryResult, FieldPacket[]] = await db.query(
      `SELECT 
            a.id as id,
            a.feed_id  as feedId,
            a.user_id  as userId,
            b.name  as userName,
            b.profile_img as profileImg,
            a.content  as content,
            a.parent_comment_id  as parentCommentId,
            a.created_at as createdAt,
            a.updated_at as updatedAt,
            a.deleted_at as deletedAt
        FROM comments a
        left join users b
            ON a.user_id = b.id 
        WHERE feed_id = ?
          AND a.deleted_at is NULL 
        ORDER BY a.created_at DESC
        `,
      [feedId],
    );
    const comments = result[0] as FeedData[];

    //페이지네이션
    const totalCount = comments.length;
    const startIndex = (cursor - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedComments = comments.slice(startIndex, endIndex);
    const hasNextPage = endIndex < totalCount;
    const nextCursor = hasNextPage ? cursor + 1 : undefined;

    return NextResponse.json({
      status: 200,
      message: '',
      comments: paginatedComments,
      hasNextPage,
      totalCount,
      nextCursor,
    });
  } catch (err) {
    console.error('readById api call Failed : ', err);
    throw new Error();
  }
}
