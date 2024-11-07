import { conn } from '@/config/db';
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
            GROUP_CONCAT(b.user_id) AS participantIds,
            GROUP_CONCAT(CONCAT(b.user_id, ':', u.email)) AS participantEmails,
            GROUP_CONCAT(CONCAT(b.user_id, ':', u.profile_img)) AS participantProfiles
        FROM  
            chat_rooms a
        JOIN 
            chat_room_participants b ON a.id = b.chat_room_id
        JOIN
            users u ON b.user_id = u.id
        WHERE 
            a.deleted_at IS NULL 
        AND   a.id IN (
            SELECT chat_room_id 
            FROM chat_room_participants
            WHERE user_id = ?
        )
        GROUP BY 
            a.id
    `,
      [loginUserId],
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
