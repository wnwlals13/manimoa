import { NextResponse } from 'next/server';
import { conn } from '@/utils/db';
import {
  FieldPacket,
  QueryResult,
  ResultSetHeader,
  RowDataPacket,
} from 'mysql2';
import bcrypt from 'bcrypt';

export async function POST(req: Request) {
  const db = await conn();
  try {
    const data = await req.json();
    const { email, password, name, goal } = data;

    // 1. 사용자 중복 확인
    const rows: [QueryResult, FieldPacket[]] = await db.query(
      'SELECT * FROM users WHERE email = ?',
      [email],
    );

    if (rows.length > 0) {
      const existingUser = rows[0] as RowDataPacket[];
      console.log(existingUser, existingUser.length);
      if (existingUser.length > 0) {
        console.error('이미 등록된 이메일입니다.');
        return NextResponse.json({
          status: 400,
          message: '이미 등록된 이메일입니다.',
        });
      }

      // 2. 비밀번호 해시
      const salt = await bcrypt.genSalt(10);
      const hashedPwd = await bcrypt.hash(password, salt);

      // 3. 새로운 사용자 생성
      const res: [QueryResult, FieldPacket[]] = await (
        await db
      ).query('INSERT INTO users (email, password, name) VALUES (?, ?, ?)', [
        email,
        hashedPwd,
        name,
      ]);

      const newUser = res[0] as ResultSetHeader;
      const now_insert_id = newUser.insertId;
      if (goal && now_insert_id) {
        await (
          await db
        ).query(
          'INSERT INTO user_expense_goals (user_id, content) VALUES (?, ?)',
          [now_insert_id, goal],
        );
      }

      // 4. 성공 리턴
      if (res) {
        return NextResponse.json({ status: 201, message: '회원가입 성공' });
      } else {
        console.error(`Failed during register user :`, res);
        return NextResponse.json({ status: 500, message: '회원가입 실패' });
      }
    }
  } catch (err) {
    console.error(`Error during register user ${err}`);
    throw new Error();
  }
}
