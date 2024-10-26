import { conn } from '@/utils/db';
import bcrypt from 'bcrypt';
import { FieldPacket, QueryResult, RowDataPacket } from 'mysql2';
import { NextResponse } from 'next/server';
import { encrypt } from '@/app/lib/session';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const db = await conn();
  try {
    const data = await req.json();
    console.log('user login post =>', req, data);
    const { email, password } = data;

    const rows: [QueryResult, FieldPacket[]] = await db.query(
      'SELECT id, email, password, name, profile_img FROM users WHERE email = ?',
      [email],
    );
    const user = rows[0] as RowDataPacket[];

    if (user.length > 0) {
      const isMatch = await bcrypt.compare(password, user[0].password);

      if (!isMatch) {
        return NextResponse.json({
          status: 401,
          message: '비밀번호가 일치하지 않습니다.',
        });
      } else {
        // 사용자 인증 성공 시 JWT 생성
        const accessToken = await encrypt({ email, uid: user[0].id });

        const response = NextResponse.json({
          status: 201,
          message: '로그인 성공',
          user: {
            uid: user[0].id,
            email: user[0].email,
            name: user[0].name,
            profileImg: user[0].profile_img,
          },
          accessToken: accessToken,
        });

        // 쿠키 설정
        response.cookies.set('accessToken', JSON.stringify(accessToken), {
          httpOnly: true,
          expires: 1,
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
      console.error('가입되지 않은 유저입니다.');
      return NextResponse.json({
        status: 409,
        message: '가입되지 않은 유저입니다.',
      });
    }
  } catch (err) {
    console.error('Failed to login', err);
    throw new Error('');
  }
}
