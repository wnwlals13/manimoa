import { verifySession } from '@/app/lib/dal';
import { NextResponse } from 'next/server';
import multer from 'multer';
import path from 'path';

// multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

export async function POST(request: Request) {
  const session = await verifySession();
  console.log('test=>', request, upload.single('image'));
  if (!session) {
    return NextResponse.json({ status: 401 });
  }
  return NextResponse.json('hello world');
}
