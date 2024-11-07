import { conn } from '@/config/db';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const db = await conn();
    const body = await request.json();

    const author = body.author;
    const msg = body.msg;
    const roomId = body.roomId;

    const result = await db.query(
      `
      INSERT INTO messages (send_user_id,room_id,content, \`read\`) VALUES (?,?,?,0)
      `,
      [author, roomId, msg],
    );

    if (!result) {
      console.error(`메세지 전송 및 추가 실패!`);
    }

    return NextResponse.json({
      status: 200,
      message: '메세지 전송 및 추가 성공',
    });
  } catch (err) {
    console.log(err);
  }
}
