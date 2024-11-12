import 'server-only';

import { cookies } from 'next/headers';
import { decrypt } from '@/lib/session';
import { cache } from 'react';
import { redirect } from 'next/navigation';
import { SessionPayload } from './definitions';

// 세션 검증
export const verifySession = cache(async () => {
  const cookie = (await cookies()).get('accessToken')?.value;
  const session = (await decrypt(cookie)) as SessionPayload;

  if (!session) {
    redirect('/login');
  }

  return { isAuth: true, userId: session.email };
});
