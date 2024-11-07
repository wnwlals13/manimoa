import { conn } from '@/config/db';
import { FieldPacket, QueryResult, RowDataPacket } from 'mysql2';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const db = await conn();
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId');
    const loginId = searchParams.get('loginId');

    const result: [QueryResult, FieldPacket[]] = await db.query(
      `
      select 
          a.id AS uid,
          a.email AS email,
          a.name AS name,
          a.profile_img AS profileImg,
          (SELECT count(*) FROM follows b
          WHERE a.id = b.follow_user_id LIMIT 1) AS followCount ,
          (SELECT count(*) FROM follows b
          WHERE a.id = b.following_user_id LIMIT 1) AS followingCount,
          CASE 
              WHEN c.chat_room_id IS NOT NULL THEN 1
              ELSE 0
          END AS isChatExist,
          c.chat_room_id AS chatRoomId
      from users a
      LEFT JOIN chat_room_participants c 
          ON c.chat_room_id IN (
              SELECT crp.chat_room_id 
              FROM chat_room_participants crp
              JOIN chat_rooms cr 
                  ON crp.chat_room_id = cr.id
              WHERE crp.user_id = ?
              AND cr.deleted_at IS NULL
          )
          AND c.user_id = a.id
      WHERE a.id = ?
    `,
      [loginId, userId],
    );

    const rows = result[0] as RowDataPacket;

    if (!rows) {
      throw new Error();
    }
    return NextResponse.json({
      status: 200,
      message: '유저 정보 조회 성공',
      user: rows[0],
    });
  } catch (err) {
    console.error('유저 정보 조회 도중 에러 발생', err);
  }
}
