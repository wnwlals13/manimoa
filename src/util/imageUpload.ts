import { createSupabaseClient } from '@/config/supabase-client';
import imageCompression from 'browser-image-compression';

type FileType = 'feed' | 'profile';

export interface IFileHandlerProps {
  type: FileType;
  file: File;
  userId?: string;
}

export interface UploadReturnType {
  data: { id: string; fullPath: string; path: string } | null;
  error: Error | null;
}

const supabase = createSupabaseClient();

const MAX_WIDTH = 1000;
const MAX_HEIGHT = 1000;
const MAX_SIZE_MB = 1;
const WEBP_QUALITY = 0.85;

// 이미지 삭제
export const handleRemoveImageFromStorage = async (previousImg: string) => {
  await supabase.storage
    .from(process.env.NEXT_PUBLIC_STORAGE_BUCKET!)
    .remove([previousImg]);
};

// 이미지 등록
export const handleUploadImageToStorage = async ({
  type,
  file,
  userId,
}: IFileHandlerProps): Promise<string | null> => {
  try {
    // 이미지 압축
    const compressedFile: File = await imageCompression(file, {
      maxSizeMB: MAX_SIZE_MB,
      maxWidthOrHeight: Math.max(MAX_WIDTH, MAX_HEIGHT),
      useWebWorker: true,
      initialQuality: WEBP_QUALITY,
      fileType: 'image/webp',
    });

    // 새로운 이미지 추가
    const fileExt = file.name.split('.').pop();
    const filePath =
      type === 'profile'
        ? `profile/${userId}/${Date.now()}.${fileExt}`
        : `feed/${Date.now()}.${fileExt}`;

    const downloadURL: UploadReturnType = await supabase.storage
      .from(process.env.NEXT_PUBLIC_STORAGE_BUCKET!)
      .upload(filePath, compressedFile);

    return downloadURL.data?.path as string;
  } catch (err) {
    console.error('[imageUpload] 이미지 저장 도중 에러 발생!', err);
    throw new Error();
  }
};
