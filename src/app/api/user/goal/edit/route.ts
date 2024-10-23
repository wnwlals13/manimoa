// import { conn } from '@/utils/db';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // let db = await conn();
    const data = await request.json();
    const { month_goals, month_price } = data;
    console.log(month_goals, month_price);
    // db.query(``);

    return NextResponse.json({ status: 201, message: '성공' });
  } catch (err) {
    console.error(err);
  }
}
