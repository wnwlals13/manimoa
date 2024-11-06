import { conn } from '@/utils/db';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const db = await conn();
    await db.query(`
            
        `);
  } catch (err) {
    console.error('채팅방 존재 여부 확인 시 에러', err);
  }
}
