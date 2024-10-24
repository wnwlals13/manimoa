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
    console.log('? : post request', email);

    // 1. 사용자 중복 확인
    const rows: [QueryResult, FieldPacket[]] = await db.query(
      'SELECT * FROM users WHERE email = ?',
      [email],
    );

    if (rows.length > 0) {
      const existingUser = rows[0] as RowDataPacket[];

      if (existingUser.length > 0) {
        // 중복 사용자 리턴
        return NextResponse.json({
          status: 400,
          message: '이미 등록된 이메일입니다.',
        });
      } else {
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
          try {
            await (
              await db
            ).query('INSERT INTO user_goals (user_id, content) VALUES (?, ?)', [
              now_insert_id,
              goal,
            ]);
          } catch (err) {
            console.error('사용자의 목표 다짐을 추가하던 중 에러 발생', err);
            throw new Error();
          }
        }

        // 4. 성공 리턴
        if (newUser) {
          return NextResponse.json({ status: 201, message: '회원가입 성공' });
        } else {
          console.error(
            `사용자를 추가하는 과정에 문제가 발생했습니다. :`,
            newUser,
          );
          return NextResponse.json({ status: 500, message: '회원가입 실패' });
        }
      }
    }
  } catch (err) {
    console.error(`Error during register user, in api route : ${err}`);
    throw new Error();
  }
}
