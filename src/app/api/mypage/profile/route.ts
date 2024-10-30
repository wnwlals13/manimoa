import { conn } from '@/utils/db';
import { FieldPacket, QueryResult, RowDataPacket } from 'mysql2';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const db = await conn();
    const data = new URL(request.url);
    const id = data.searchParams.get('q');
    console.log('userid in server => ', id);
    const result: [QueryResult, FieldPacket[]] = await db.query(
      `SELECT 
      SUM(CASE WHEN follow_user_id = ? THEN 1 ELSE 0 END) AS followCnt,
      SUM(CASE WHEN following_user_id = ? THEN 1 ELSE 0 END) AS followingCnt
      FROM follows`,
      [id, id],
    );
    const rows = result[0] as RowDataPacket;

    const returnData = {
      followCnt: 0,
      followingCnt: 0,
    };
    console.log('get profil in server =>', rows[0]);
    if (rows[0].followCnt) returnData.followCnt = rows[0].followCnt;
    if (rows[0].followingCnt) returnData.followingCnt = rows[0].followingCnt;

    return NextResponse.json({ status: 201, data: returnData });
  } catch (err) {
    console.error(err);
  }
}
