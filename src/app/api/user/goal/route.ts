import { conn } from '@/utils/db';
import { FieldPacket, QueryResult, RowDataPacket } from 'mysql2';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const db = await conn();
    const data = new URL(request.url);
    const id = data.searchParams.get('q'); // 로그인 사용자
    const now_month = new Date().getMonth() + 1; // 이번 달

    // 1. 소비 다짐 조회
    const result: [QueryResult, FieldPacket[]] = await db.query(
      `SELECT *
        FROM user_goals a 
        WHERE a.user_id = ? and month(a.created_at) = ?`,
      [id, now_month],
    );

    // 2. 목표 소비액 조회
    const result_second: [QueryResult, FieldPacket[]] = await db.query(
      `SELECT *
        FROM user_expenses a 
        WHERE a.user_id = ? and month(a.created_at) = ?`,
      [id, now_month],
    );

    const rows = result[0] as RowDataPacket;
    const rows_second = result_second[0] as RowDataPacket;
    // console.log(rows_second);
    return NextResponse.json({
      status: 201,
      message: '성공',
      goals: rows,
      price: rows_second,
    });
  } catch (err) {
    console.error(err);
    throw new Error();
  }
}
