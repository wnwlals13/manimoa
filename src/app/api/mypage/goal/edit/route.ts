import { conn } from '@/config/db';
import { FieldPacket, QueryResult, RowDataPacket } from 'mysql2';
import { NextResponse } from 'next/server';

export async function PATCH(request: Request) {
  try {
    const db = await conn();
    const data = await request.json();

    const month_goals = data.month_goals as { value: string }[];
    const month_price = data.month_price ? data.month_price : undefined;
    const userId = data.userId;
    const month = new Date().getMonth() + 1;

    if (month_goals) {
      const del_res: [QueryResult, FieldPacket[]] = await db.query(
        `DELETE FROM user_goals WHERE month(created_at) = ? AND user_id = ?`,
        [month, userId],
      );
      const rows = del_res[0] as RowDataPacket;
      if (rows) {
        month_goals.forEach(async (goal) => {
          await db.query(
            `
            INSERT INTO user_goals (user_id, content) VALUES (?,?)
            `,
            [userId, goal.value],
          );
        });
      }
    }

    if (month_price) {
      const del_res: [QueryResult, FieldPacket[]] = await db.query(
        `DELETE FROM user_expenses WHERE month(created_at) = ? AND user_id = ?`,
        [month, userId],
      );
      const rows = del_res[0] as RowDataPacket;
      if (rows) {
        await db.query(
          `
            INSERT INTO user_expenses (user_id, price) VALUES (?,?)
            `,
          [userId, month_price],
        );
      }
    }

    const result = { month_goals: month_goals, month_price: month_price };

    return NextResponse.json({ status: 200, message: '성공', data: result });
  } catch (err) {
    console.error(err);
    throw new Error();
  }
}
