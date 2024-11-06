import { conn } from '@/utils/db';
import { FieldPacket, QueryResult, RowDataPacket } from 'mysql2';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const db = await conn();
    const searchParams = request.nextUrl.searchParams;
    console.log('searchParams', searchParams);
    const cursor = Number(searchParams.get('cursor'));
    const pageSize = Number(searchParams.get('pageSize'));
    const input = searchParams.get('input');
    const userId = searchParams.get('userId');

    const result: [QueryResult, FieldPacket[]] = await db.query(
      ` SELECT 
            u.id AS uid,
            u.email AS email,
            u.name AS name,
            u.profile_img AS profileImg,
            CASE 
                WHEN c.chat_room_id IS NOT NULL THEN 1
                ELSE 0
            END AS isChatExist,
            c.chat_room_id AS chatRoomId
        FROM users u
        LEFT JOIN chat_room_participants c 
            ON c.chat_room_id IN (
                SELECT crp.chat_room_id 
                FROM chat_room_participants crp
                JOIN chat_rooms cr 
                    ON crp.chat_room_id = cr.id
                WHERE crp.user_id = ?
                AND cr.deleted_at IS NULL
            )
            AND c.user_id = u.id
        WHERE u.id != ?
        AND u.email LIKE ?
        AND u.deleted_at IS NULL
        `,
      [userId, userId, `%${input}%`],
    );
    const users = result[0] as RowDataPacket;
    console.log('input', input, 'row', users);
    //페이지네이션
    const totalCount = users.length;
    const startIndex = (cursor - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedUsers = users.slice(startIndex, endIndex);

    const hasNextPage = endIndex < totalCount;
    const nextCursor = hasNextPage ? cursor + 1 : undefined;

    return NextResponse.json({
      status: 200,
      message: '',
      users: paginatedUsers,
      hasNextPage,
      totalCount,
      nextCursor,
      currentPage: cursor,
    });
  } catch (err) {
    console.error(`사용자 조회 실패 : ${err}`);
  }
}
