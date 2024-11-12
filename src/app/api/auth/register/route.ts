import { NextResponse } from 'next/server';
import { conn } from '@/config/db';
import {
  FieldPacket,
  QueryResult,
  ResultSetHeader,
  RowDataPacket,
} from 'mysql2';
import bcrypt from 'bcrypt';
import { encrypt } from '@/lib/session';

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

      if (existingUser.length > 0) {
        // 중복 사용자 리턴
        return NextResponse.json(
          { error: '이미 등록된 이메일입니다.' },
          { status: 400 },
        );
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

        // 4. 사용자 조회
        const rows: [QueryResult, FieldPacket[]] = await (
          await db
        ).query(
          'SELECT id, email, password, name, profile_img FROM users WHERE id = ?',
          [now_insert_id],
        );
        const row = rows[0] as RowDataPacket;

        // 5. 성공 리턴
        if (newUser && row) {
          // 사용자 인증 성공 시 JWT 생성
          const accessToken = await encrypt({
            email,
            uid: row[0].id,
            expire: '1h',
          });

          // refreshToken 발급
          const refreshToken = await encrypt({
            email,
            uid: row[0].id,
            expire: '7d',
          });

          const response = NextResponse.json({
            status: 200,
            message: '로그인 성공',
            user: {
              uid: row[0].id,
              email: row[0].email,
              name: row[0].name,
              profileImg: row[0].profile_img,
              accessToken: accessToken,
              refreshToken: refreshToken,
            },
          });

          // 쿠키 설정
          response.cookies.set('accessToken', accessToken, {
            httpOnly: true,
            expires: 1,
          });
          response.cookies.set('refreshToken', refreshToken, {
            httpOnly: true,
          });
          response.cookies.set(
            'user',
            JSON.stringify({
              uid: row[0].id,
              email: row[0].email,
              name: row[0].name,
              profileImg: row[0].profile_img,
              accessToken: accessToken,
            }),
          );

          return response;
        } else {
          console.error(
            `사용자를 추가하는 과정에 문제가 발생했습니다. :`,
            newUser,
          );
          return NextResponse.json(
            { error: '회원가입에 실패했습니다.' },
            { status: 500 },
          );
        }
      }
    }
  } catch (err) {
    console.error(`Error during register user, in api route : ${err}`);
    throw new Error();
  }
}
