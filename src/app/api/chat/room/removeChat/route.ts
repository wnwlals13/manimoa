import { conn } from '@/config/db';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(reqeust: NextRequest) {
  try {
    const db = await conn();
    const willRemoveRooms = await reqeust.json();

    const result = Promise.all(
      willRemoveRooms.map(async (roomId: string) => {
        await db.query(
          `
            UPDATE chat_rooms SET deleted_at = CURRENT_TIMESTAMP() WHERE id = ?
            `,
          [roomId],
        );
      }),
    );

    if (!result) {
      console.error('채팅방 삭제에 실패했습니다!');
    }

    return NextResponse.json({ status: 200, message: '채팅방 삭제 성공' });
  } catch (err) {
    console.error('채팅방 삭제 도중 에러 발생', err);
  }
}
