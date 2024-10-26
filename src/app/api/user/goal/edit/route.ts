import { cookies } from 'next/headers';
import { conn } from '@/utils/db';
import { FieldPacket, QueryResult, RowDataPacket } from 'mysql2';
import { NextResponse } from 'next/server';
import { goalsArrayProps } from '@/app/(with-nav)/user/edit-goals/page';

export async function POST(request: Request) {
  try {
    const db = await conn();
    const data = await request.json();

    const month_goals = data.month_goals as goalsArrayProps[];
    const month_price = data.month_price;

    const month = new Date().getMonth() + 1;
    const userCookie = cookies().get('user')?.value;
    const user = JSON.parse(userCookie as string);

    if (month_goals) {
      const del_res: [QueryResult, FieldPacket[]] = await db.query(
        `DELETE FROM user_goals WHERE month(created_at) = ? AND user_id = ?`,
        [month, user.uid],
      );
      const rows = del_res[0] as RowDataPacket;
      if (rows) {
        month_goals.forEach(async (goal) => {
          await db.query(
            `
            INSERT INTO user_goals (user_id, content) VALUES (?,?)
            `,
            [user.uid, goal.value],
          );
        });
      }
    }

    if (month_price) {
      const del_res: [QueryResult, FieldPacket[]] = await db.query(
        `DELETE FROM user_expenses WHERE month(created_at) = ? AND user_id = ?`,
        [month, user.uid],
      );
      const rows = del_res[0] as RowDataPacket;
      if (rows) {
        await db.query(
          `
            INSERT INTO user_expenses (user_id, price) VALUES (?,?)
            `,
          [user.uid, month_price],
        );
      }
    }

    return NextResponse.json({ status: 201, message: '성공' });
  } catch (err) {
    console.error(err);
    throw new Error();
  }
}
