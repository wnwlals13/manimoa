import { conn } from '@/utils/db';
import { FieldPacket, QueryResult, ResultSetHeader } from 'mysql2';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const db = await conn();
    const userIds = (await request.json()) as string[];
    console.log('userId =>', userIds);
    // 채팅방 생성
    const result: [QueryResult, FieldPacket[]] = await db.query(`
        INSERT INTO chat_rooms (created_at) VALUES (current_timestamp())
    `);

    const insert = result[0] as ResultSetHeader;
    const newChatRoomId = insert.insertId;

    // 채팅방 참여자 추가
    const allResult = Promise.all(
      userIds.map(async (id) => {
        await db.query(
          `
        INSERT INTO chat_room_participants (chat_room_id, user_id, joined_at) values (?,?,current_timestamp())
        `,
          [newChatRoomId, id],
        );
      }),
    );
    console.log('allResult =>', allResult);
    if (!allResult) {
      console.error('채팅방 추가 실패');
    }

    return NextResponse.json({
      status: 200,
      message: '채팅방 추가 성공',
      newChatRoomId,
    });
  } catch (err) {
    console.error(`채팅방 추가 도중 에러 발생`, err);
  }
}
