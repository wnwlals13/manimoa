import {
  handleRemoveImageFromStorage,
  handleUploadImageToStorage,
} from '@/util/imageUpload';
import { updateFeedRequestDto, uploadFeedRequestDto } from './type';
import { FeedData, ImageData } from '@/types';

export const removeFeed = async (feedId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/feed/remove`,
      {
        method: 'PATCH',
        body: feedId,
      },
    );

    if (!res.ok) {
      console.error(`데이터 삭제 과정 api 에러 발생`);
    }
    const result = await res.json();

    // 이미지 삭제
    if (result.delImgs) {
      const willDelete = result.delImgs as ImageData[];
      willDelete.forEach((img: ImageData) =>
        handleRemoveImageFromStorage(img.imageUrl),
      );
    }

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

export const fetchOneFeed = async (
  id: string,
  userId: string,
): Promise<FeedData | undefined> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/feed/${id}?userId=${userId}`,
      { method: 'get' },
    );
    if (!response) {
      return {} as FeedData;
    }

    let result = (await response.json()) as FeedData;
    result = { ...result, imagesArray: result.images?.split(',') };

    return result;
  } catch (err) {
    console.error('myfetch 에러 발생', err);
  }
};

export const uploadFeed = async ({
  // date,
  price,
  priceOption,
  content,
  previewImage,
}: uploadFeedRequestDto) => {
  try {
    let paths;
    if (previewImage) {
      paths = await Promise.all(
        previewImage.map(
          async (img) =>
            await handleUploadImageToStorage({
              file: img,
              type: 'feed',
            }),
        ),
      );
    }

    // 2. db에 url 저장
    const contentData = {
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

export const updateFeed = async ({
  price,
  priceOption,
  content,
  willDeleteImgs,
  previewImage,
  feedId,
}: updateFeedRequestDto) => {
  try {
    if (willDeleteImgs) {
      console.log('willDeleteImgs', willDeleteImgs);
      willDeleteImgs.forEach((img) => handleRemoveImageFromStorage(img));
    }
    let paths;
    if (previewImage) {
      paths = await Promise.all(
        previewImage.map(
          async (img) =>
            await handleUploadImageToStorage({
              file: img,
              type: 'feed',
            }),
        ),
      );
    }

    // 2. db에 url 저장
    const updateData = {
      price,
      priceOption,
      content,
      paths: paths,
      delPaths: willDeleteImgs,
      feedId: feedId,
    };
    const resposne = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/feed/update`,
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData),
      },
    );

    if (!resposne.ok) {
      console.error('게시글 수정 도중 실패');
      throw new Error();
    }

    return await resposne.json();
  } catch (err) {
    console.error('feed 업데이트 도중 에러 발생', err);
  }
};

export const fetchFeeds = async (pageParam: number, pageSize: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/feed/readAll?cursor=` +
        pageParam +
        `&pageSize=` +
        pageSize,
      { cache: 'no-store' },
    ).then((res) => res.json());

    return response;
  } catch (err) {
    console.error('게시글 fetch 실패', err);
    throw new Error();
  }
};

export const fetchLikes = async (
  pageParam: number,
  pageSize: number,
  userId: string,
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/feed/readLikes?cursor=` +
        pageParam +
        `&pageSize=` +
        pageSize +
        `&userId=` +
        userId,
      { cache: 'no-store' },
    ).then((res) => res.json());

    return response;
  } catch (err) {
    console.error('게시글 Likes fetch 실패', err);
    throw new Error();
  }
};
