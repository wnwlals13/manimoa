'use server';

import { conn } from '@/utils/db';
import bcrypt from 'bcrypt';
import { FieldPacket, QueryResult, RowDataPacket } from 'mysql2';
import { NextResponse } from 'next/server';
import { encrypt } from '@/app/lib/session';
import { revalidateTag } from 'next/cache';

export async function POST(req: Request) {
  const db = await conn();
  try {
    const data = await req.json();
    const { email, password } = data;

    const rows: [QueryResult, FieldPacket[]] = await db.query(
      'SELECT id, email, password, name, profile_img FROM users WHERE email = ?',
      [email],
    );
    const user = rows[0] as RowDataPacket[];

    if (user.length > 0) {
      const isMatch = await bcrypt.compare(password, user[0].password);

      if (!isMatch) {
        return NextResponse.json(
          { error: '비밀번호가 맞지 않습니다.' },
          { status: 401 },
        );
      } else {
        // 사용자 인증 성공 시 JWT 생성
        const accessToken = await encrypt({
          email,
          uid: user[0].id,
          expire: '1h',
        });

        // refreshToken 발급
        const refreshToken = await encrypt({
          email,
          uid: user[0].id,
          expire: '7d',
        });

        const response = NextResponse.json({
          status: 201,
          message: '로그인 성공',
          user: {
            uid: user[0].id,
            email: user[0].email,
            name: user[0].name,
            profileImg: user[0].profile_img,
            accessToken: accessToken,
            refreshToken: refreshToken,
          },
        });
        revalidateTag(`profile`);
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
            uid: user[0].id,
            email: user[0].email,
            name: user[0].name,
            profileImg: user[0].profile_img,
            accessToken: accessToken,
          }),
        );

        return response;
      }
    } else {
      // 해당하는 이메일의 유저가 없다.
      return NextResponse.json(
        {
          error: '가입되지 않은 유저입니다.',
        },
        { status: 409 },
      );
    }
  } catch (err) {
    console.error('Failed to login', err);
    throw new Error('');
  }
}
