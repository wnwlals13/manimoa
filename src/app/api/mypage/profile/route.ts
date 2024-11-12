import { conn } from '@/config/db';
import { FieldPacket, QueryResult, RowDataPacket } from 'mysql2';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const db = await conn();
    const data = new URL(request.url);
    const id = data.searchParams.get('q');

    const result: [QueryResult, FieldPacket[]] = await db.query(
      `SELECT 
        SUM(CASE WHEN follow_user_id = ? THEN 1 ELSE 0 END) AS followCount,
        SUM(CASE WHEN following_user_id = ? THEN 1 ELSE 0 END) AS followingCount
      FROM follows`,
      [id, id],
    );
    const rows = result[0] as RowDataPacket;

    const returnData = {
      followCount: 0,
      followingCount: 0,
    };

    if (rows[0].followCount) returnData.followCount = rows[0].followCount;
    if (rows[0].followingCount)
      returnData.followingCount = rows[0].followingCount;

    return NextResponse.json({ status: 200, data: returnData });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ status: 500, message: 'profile 조회 실패!' });
  }
}
