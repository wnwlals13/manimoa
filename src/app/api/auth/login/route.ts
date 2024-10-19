import jwt from 'jsonwebtoken';
import { conn } from '@/utils/db';
import bcrypt from 'bcrypt';
import { FieldPacket, QueryResult, RowDataPacket } from 'mysql2';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const db = await conn();
  try {
    const data = await req.json();
    const { email, password } = data;

    const rows: [QueryResult, FieldPacket[]] = await db.query(
      'SELECT id, email, password, name, profile_img FROM users WHERE email = ?',
      [email],
    );

    if (rows.length > 0) {
      const user = rows[0] as RowDataPacket[];
      const isMatch = await bcrypt.compare(password, user[0].password);
      if (!isMatch) {
        throw new Error('비밀번호가 일치하지 않습니다.');
      }

      // 사용자 인증 성공 시 JWT 생성
      const token = jwt.sign(
        { email },
        `${process.env.NEXT_PUBLIC_JWT_TOKEN}`,
        { expiresIn: '1h' },
      );
      const response = NextResponse.json({
        status: 201,
        message: '로그인 성공',
        user: {
          uid: user[0].uid,
          email: user[0].email,
          name: user[0].name,
          profileImg: user[0].profile_img,
        },
      });

      // 쿠키 설정
      response.cookies.set('token', token, {
        httpOnly: true,
      });
      response.cookies.set('user', user[0].email);

      return response;
    } else {
      // 해당하는 이메일의 유저가 없다.
    }
  } catch (err) {
    console.error('Failed to login', err);
    throw new Error('');
  }
}
