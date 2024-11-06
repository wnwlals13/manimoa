import { conn } from '@/utils/db';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const db = await conn();
    const searchParams = request.nextUrl.searchParams;
    const roomId = searchParams.get('roomId');

    const result = await db.query(
      `
        SELECT 
          a.send_user_id AS author,
          a.content AS msg,
          a.created_at AS date,
          a.room_id AS roomId
        FROM messages a 
        JOIN chat_rooms b ON (a.room_id = b.id)
        WHERE b.id = ?
    `,
      [roomId],
    );
    console.log(roomId, 'readAll message in server =>', result[0]);
    return NextResponse.json({ status: 200, messages: result[0] });
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      status: 500,
      message: 'message readAll 실패',
    });
  }
}
