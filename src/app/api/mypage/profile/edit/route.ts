import { NextResponse } from 'next/server';
import { conn } from '@/utils/db';
import { FieldPacket, QueryResult, ResultSetHeader } from 'mysql2';
import { cookies } from 'next/headers';
import { revalidateTag } from 'next/cache';

export async function POST(req: Request) {
  try {
    const db = await conn();
    const data = await req.json();
    const cookieStore = cookies().get('user')?.value;

    const user = JSON.parse(cookieStore as string);

    const result: [QueryResult, FieldPacket[]] = await db.query(
      'UPDATE users SET name = ?, profile_img = ? WHERE users.id = ?',
      [data.name, data.path, user.uid],
    );
    const rows = result[0] as ResultSetHeader;
    if (!rows) {
      return NextResponse.json({
        status: 400,
        message: '실패',
      });
    }

    // 성공
    revalidateTag('profile');

    return NextResponse.json({
      status: 201,
      message: '성공',
      updated: { name: data.name, profileImg: data.path },
    });
  } catch (err) {
    console.error(err);
  }
}
