'use client';

import { Input } from '@/components/ui/input';
import InteractiveButton from '@/components/ui/interactiveButton';
import { Toggle } from '@/components/ui/toggle';
import { ChangeEvent, Suspense, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiX, FiImage } from 'react-icons/fi';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useFeedStore } from '@/store/feed/useFeedStore';
import 'swiper/swiper-bundle.css';
import { createSupabaseClient } from '@/utils/supabase-client';
import { useAuthStore } from '@/store/auth/useAuthStore';
import { useRouter, useSearchParams } from 'next/navigation';
import { FeedData } from '@/types';

interface feedFormInputs {
  date: string;
  price: string;
  priceOption: boolean;
  content: string;
}

export const dynamic = 'force-dynamic';

async function FeedForm(feedInfo: FeedData) {}

export default function Page() {
  const { user, userFeeds } = useAuthStore();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    image,
    previewImage,
    showPrice,
    date,
    setPreviewImage,
    setShowPrice,
    setImage,
    setContent,
    setDate,
    resetPreviewImage,
    delPreviewImage,
  } = useFeedStore();

  const [willDeleteImgs, setWillDeleteImgs] = useState<string[]>([]);

  const searchParams = useSearchParams();
  const isEdit = searchParams.get('isEdit'); // 게시글 수정 여부
  const feedId = searchParams.get('feedId'); // 게시글 id

  const { register, setValue, handleSubmit } = useForm({
    defaultValues: {
      date: isEdit ? date.toLocaleString() : new Date().toLocaleString(),
      price: '',
      priceOption: showPrice,
      content: '',
    },
  });

  const uploadImgs = async () => {
    const supabase = await createSupabaseClient();
    try {
      // 이미지 저장
      const result = await Promise.all(
        previewImage.map(async (previews) => {
          const file = previews;
          const fileExt = file.name.split('.').pop();
          const filePath = `feed/${user?.uid}/${Math.random()}.${fileExt}`;

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

  const upload = async (data: feedFormInputs) => {
    // 1. 저장소에 이미지 저장
    const paths = await uploadImgs();

    // 2. db에 url 저장
    const contentData = {
      ...data,
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
    router.push('/');
  };

  const update = async (inputs: feedFormInputs) => {
    const supabase = await createSupabaseClient();
    // 기존 이미지 (image) 삭제 시, 삭제
    console.log(willDeleteImgs);
    if (willDeleteImgs.length > 0) {
      willDeleteImgs.forEach(async (img) => {
        await supabase.storage
          .from(`${process.env.NEXT_PUBLIC_STORAGE_BUCKET}`)
          .remove([img]);
      });
    }
    // 기존 이미지 (image) 유지 시 패스
    // 새로운 이미지 (previewImage) 존재 시 추가
    let paths;
    if (previewImage.length > 0) {
      paths = await uploadImgs();
    }
    // 2. db에 url 저장
    const updateData = {
      ...inputs,
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
    router.push('/');
  };

  const onSubmit = (data: feedFormInputs) => {
    if (!isEdit) upload(data);
    else update(data);
  };
  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleUploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (file && file.length > 0) {
      const fileArray = Array.from(file);
      setPreviewImage(fileArray);
    }
  };

  // 이미지 x 버튼 클릭
  const handleDelImg = (e: React.MouseEvent, item: string, index: number) => {
    const deletedImg = image.filter((item, idx) => idx !== index);
    setWillDeleteImgs([...willDeleteImgs, item]);
    setImage(deletedImg);
  };
  const handleDelPreviewImg = (e: React.MouseEvent, name: string) => {
    // e.preventDefault();
    delPreviewImage(name);
  };

  useEffect(() => {
    setValue('priceOption', showPrice);
  }, [showPrice]);

  useEffect(() => {
    // 게시글 수정 시 데이터 입력
    if (isEdit && feedId) {
      const currentFeed = userFeeds.filter(
        (item) => item.id === Number(feedId),
      );

      if (currentFeed && currentFeed[0]) {
        setContent(currentFeed[0].content);
        setValue('content', currentFeed[0].content);
        setValue('price', currentFeed[0].price.toString());
        setDate(new Date(currentFeed[0].createdAt));

        const imagesArray = currentFeed[0].images?.split(',');
        if (imagesArray) setImage(imagesArray);
      }
    }
  }, [isEdit, feedId, userFeeds]);

  useEffect(() => {
    console.log(
      'is previewImage changed ? ->',
      previewImage,
      'image => ',
      image,
    );
  }, [previewImage, image]);

  useEffect(() => {
    return () => {
      resetPreviewImage();
    };
  }, []);

  return (
    <Suspense fallback={<div>loading...</div>}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex-1 flex flex-col">
        <div className="flex-1">
          <div className="flex pt-5 pb-5 border-b">
            <div className="min-w-[100px]">소비 일자</div>
            <div>
              {date.getFullYear() +
                '년 ' +
                (date.getMonth() + 1) +
                '월 ' +
                date.getDate() +
                '일'}
            </div>
          </div>
          <div className="flex gap-5 pt-5 pb-5 border-b mb-5 items-center">
            <div className="flex-1 flex items-center">
              <div className="min-w-[100px]">오늘 소비</div>
              <Input
                type="number"
                {...register('price', { required: true })}
                onChange={(e) => {
                  console.log(e.target.value);
                }}
              />
            </div>
            <Toggle variant="outline" size="sm" onClick={setShowPrice}>
              {!showPrice ? '금액 보이기' : '금액 숨기기'}
            </Toggle>
          </div>
          <div className="w-full">
            <textarea
              id="content"
              placeholder="오늘 당신의 소비내용을 기록해주세요."
              className="min-h-44 h-44 resize-none w-full p-2"
              {...register('content', { required: true })}
            ></textarea>
          </div>
          <div className="flex-1 flex gap-2 mt-2">
            <div>
              <FiImage
                size="25"
                className="mb-5 cursor-pointer"
                onClick={handleClick}
              />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                multiple
                ref={fileInputRef}
                onChange={handleUploadImage}
              />
            </div>
            <div className="flex-1 flex overflow-hidden ">
              <Swiper
                direction="horizontal"
                slidesPerView={2}
                spaceBetween={20}
                pagination={{ clickable: true }}
                className="flex-1 w-full h-[200px]"
              >
                {image &&
                  image.map((item, idx) => (
                    <SwiperSlide
                      key={idx}
                      className="w-[253px] h-[200px] bg-yellow-200"
                    >
                      <button
                        type="button"
                        className="absolute p-1 right-1 top-1 bg-white rounded-full shadow-xl"
                        onClick={(e) => handleDelImg(e, item, idx)}
                      >
                        <FiX size={20} />
                      </button>
                      <img
                        src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${process.env.NEXT_PUBLIC_STORAGE_BUCKET}/${item}`}
                        style={{
                          objectFit: 'cover',
                          width: '100%',
                          height: '100%',
                        }}
                        alt=""
                      />
                    </SwiperSlide>
                  ))}
                {previewImage &&
                  previewImage.map((item, idx) => (
                    <SwiperSlide
                      key={idx}
                      className="w-[253px] h-[200px] bg-yellow-200"
                    >
                      <button
                        type="button"
                        className="absolute p-1 right-1 top-1 bg-white rounded-full shadow-xl"
                        onClick={(e) => handleDelPreviewImg(e, item.name)}
                      >
                        <FiX size={20} />
                      </button>
                      <img
                        src={URL.createObjectURL(previewImage[idx])}
                        style={{
                          objectFit: 'cover',
                          width: '100%',
                          height: '100%',
                        }}
                      />
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>
          </div>
        </div>
        <InteractiveButton name="add_feed" type="submit">
          {isEdit ? '게시글 수정' : '게시글 추가'}
        </InteractiveButton>
      </form>
      );
    </Suspense>
  );
}
