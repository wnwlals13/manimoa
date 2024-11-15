import { conn } from '@/config/db';
import { IMsg } from '@/types';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const db = await conn();
    const searchParams = request.nextUrl.searchParams;
    const roomId = searchParams.get('roomId');
    const page = Number(searchParams.get('page')) || 1;
    const pageSize = Number(searchParams.get('per')) || 10;

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

    const messages = result[0] as IMsg[];
    //페이지네이션
    const totalCount = messages.length;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedMessage = messages.slice(startIndex, endIndex);

    const hasNextPage = endIndex < totalCount;
    const nextCursor = hasNextPage ? page + 1 : undefined;

    return NextResponse.json(
      {
        data: paginatedMessage,
        nextCursor,
      },
      { status: 200 },
    );
  } catch (err) {
    return NextResponse.json(
      {
        error: `메세지 리스트 조회 실패 ${err}`,
      },
      {
        status: 500,
      },
    );
  }
}
