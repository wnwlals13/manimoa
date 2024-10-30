import { conn } from '@/utils/db';
import { FieldPacket, QueryResult, RowDataPacket } from 'mysql2';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const db = await conn();
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId');
    console.log('cookie? 왜없지', userId);
    const now_month = new Date().getMonth() + 1; // 이번 달

    // 1. 소비 다짐 조회
    const result: [QueryResult, FieldPacket[]] = await db.query(
      `SELECT *
        FROM user_goals a
        WHERE a.user_id = ? and month(a.created_at) = ?`,
      [userId, now_month],
    );

    // 2. 목표 소비액 조회
    const result_second: [QueryResult, FieldPacket[]] = await db.query(
      `SELECT *
        FROM user_expenses a
        WHERE a.user_id = ? and month(a.created_at) = ?`,
      [userId, now_month],
    );

    const rows = result[0] as RowDataPacket;
    const rows_second = result_second[0] as RowDataPacket;
    console.log('goals', rows, 'price', rows_second);
    return NextResponse.json({
      status: 200,
      message: '성공',
      goals: rows,
      price: rows_second,
    });
  } catch (err) {
    console.error(err);
    throw new Error();
  }
}
