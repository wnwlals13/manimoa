import { conn } from '@/utils/db';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const db = await conn();
    const searchParams = request.nextUrl.searchParams;
    const loginUserId = searchParams.get('userId');

    const result = await db.query(
      `
        SELECT  
            a.id AS roomId, 
            a.created_at AS createdAt,
            GROUP_CONCAT(CASE WHEN b.user_id != ? THEN b.user_id END) AS otherUserId,
            GROUP_CONCAT(CASE WHEN b.user_id != ? THEN (
                SELECT c.email
                FROM users c
                WHERE c.id = b.user_id
            ) END) AS otherUserEmail
        FROM  
            chat_rooms a
        LEFT JOIN 
            chat_room_participants b
            ON a.id = b.chat_room_id
        WHERE 
            a.id IN (
                SELECT chat_room_id 
                FROM chat_room_participants
                WHERE user_id = ?
            )
            AND a.deleted_at is NULL 
        GROUP BY 
            a.id
    `,
      [loginUserId, loginUserId, loginUserId],
    );

    if (!result) {
      console.error('채팅방이 없습니다.');
    }
    console.log('result=>', result[0]);
    return NextResponse.json({ status: 200, chatRooms: result[0] });
  } catch (err) {
    console.log(err);
  }
}
