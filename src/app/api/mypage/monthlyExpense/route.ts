import { conn } from '@/config/db';
import { RowDataPacket } from 'mysql2';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const db = await conn();
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId');

    const result = await db.query(
      `
        SELECT 
            sum(price) as totalMonthlyExpense
        FROM feeds 
        WHERE user_id = ? 
            AND MONTH(created_at) = MONTH(CURRENT_DATE)
            AND YEAR(created_at) = YEAR(CURRENT_DATE)
            AND deleted_at IS NULL
    `,
      [userId],
    );
    const rows = result[0] as RowDataPacket;

    if (!result) {
      console.error('이번달 총 소비 금액 조회에 실패했습니다.');
      return NextResponse.json({
        status: 500,
        message: '총 소비금액 조회 실패',
      });
    }
    return NextResponse.json({
      status: 200,
      expenses: rows[0].totalMonthlyExpense,
    });
  } catch (err) {
    console.error('이번달 총 소비 금액 조회 도중 에러 발생', err);
    return NextResponse.json({
      status: 500,
      message: '총 소비금액 조회 도중 에러 발생',
    });
  }
}
