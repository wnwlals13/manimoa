import jwt from 'jsonwebtoken';
import { SessionPayload } from './definitions';

// 비밀키
const secretKey = process.env.NEXT_PUBLIC_JWT_TOKEN || '';

export async function encrypt(payload: SessionPayload) {
  const token = jwt.sign(payload, secretKey, {
    algorithm: 'HS256',
    expiresIn: payload.expire,
  });
  return token;
}

export async function decrypt(session: string | undefined = '') {
  try {
    const decoded = await jwt.verify(session, secretKey, {
      algorithms: ['HS256'],
    });
    return decoded;
  } catch (error) {
    console.error('Failed to verify session', error);
  }
}
