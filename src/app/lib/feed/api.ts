import { createSupabaseClient } from '@/utils/supabase-client';

export const deleteFeed = async (feedId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/feed/delete`,
      {
        method: 'post',
        body: feedId,
      },
    );

    if (!res.ok) {
      console.error(`데이터 삭제 과정 api 에러 발생`);
    }

    const result = await res.json();
    return result;
  } catch (err) {
    console.error('피드 삭제에 실패했습니다.', err);
  }
};

export const fetchMyFeeds = async (userId: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/feed/readByUser?id=${userId}`,
      {
        method: 'get',
        cache: 'no-store',
      },
    ).then((res) => res.json());

    return response.data;
  } catch (err) {
    console.error('myfetch 에러 발생', err);
  }
};

export const fetchOneFeed = async (feedId: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/feed/detail?id=${feedId}`,
      { method: 'get' },
    ).then((res) => res.json());

    return response.data;
  } catch (err) {
    console.error('myfetch 에러 발생', err);
  }
};

export const uploadImgs = async (userId: string, previewImage: File[]) => {
  const supabase = await createSupabaseClient();
  try {
    // 이미지 저장
    const result = await Promise.all(
      previewImage.map(async (previews) => {
        const file = previews;
        const fileExt = file.name.split('.').pop();
        const filePath = `feed/${userId}/${Math.random()}.${fileExt}`;

        const { data, error } = await supabase.storage
          .from(process.env.NEXT_PUBLIC_STORAGE_BUCKET!)
          .upload(filePath, file);

        if (error) {
          console.error('Failed to insert image to storage : ', error);
          throw new Error('[client] 이미지 저장 도중 에러가 발생했습니다.');
        }

        return data.path;
      }),
    );

    return result;
  } catch (err) {
    console.error('[client] 이미지 저장 실패', err);
  }
};

export interface uploadFeedRequestDto {
  date: string;
  price: string;
  priceOption: boolean;
  content: string;
  userId: string;
  previewImage: File[];
}

export const uploadFeed = async ({
  date,
  price,
  priceOption,
  content,
  userId,
  previewImage,
}: uploadFeedRequestDto) => {
  try {
    // 1. 저장소에 이미지 저장
    const paths = await uploadImgs(userId, previewImage);

    // 2. db에 url 저장
    const contentData = {
      date,
      price,
      priceOption,
      content,
      paths: paths,
    };

    const fileResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/feed/upload`,
      {
        method: 'post',
        body: JSON.stringify(contentData),
      },
    );

    if (!fileResponse.ok) {
      console.error('[client] 게시글 저장 중 에러가 발생했습니다.');
      throw new Error();
    }
    const result = await fileResponse.json();
    return result;
  } catch (err) {
    console.error('feed 업로드 도중 에러 발생', err);
  }
};

export interface updateFeedRequestDto {
  date: string;
  price: string;
  priceOption: boolean;
  content: string;
  userId: string;
  willDeleteImgs: string[];
  previewImage: File[];
  feedId: string;
}

export const updateFeed = async ({
  date,
  price,
  priceOption,
  content,
  userId,
  willDeleteImgs,
  previewImage,
  feedId,
}: updateFeedRequestDto) => {
  try {
    const supabase = await createSupabaseClient();
    // 기존 이미지 (image) 삭제 시, 삭제
    if (willDeleteImgs && willDeleteImgs.length > 0) {
      willDeleteImgs.forEach(async (img) => {
        await supabase.storage
          .from(`${process.env.NEXT_PUBLIC_STORAGE_BUCKET}`)
          .remove([img]);
      });
    }
    // 기존 이미지 (image) 유지 시 패스
    // 새로운 이미지 (previewImage) 존재 시 추가
    let paths;
    if (previewImage && previewImage.length > 0) {
      paths = await uploadImgs(userId, previewImage);
    }
    // 2. db에 url 저장
    const updateData = {
      date,
      price,
      priceOption,
      content,
      paths: paths,
      delPaths: willDeleteImgs,
      feedId: feedId,
    };
    const resposne = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/feed/update`,
      { method: 'post', body: JSON.stringify(updateData) },
    );

    if (!resposne.ok) {
      console.error('게시글 수정 도중 실패');
      throw new Error();
    }
    return resposne;
  } catch (err) {
    console.error('feed 업데이트 도중 에러 발생', err);
  }
};
