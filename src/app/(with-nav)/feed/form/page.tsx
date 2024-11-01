'use client';

import { Input } from '@/components/ui/input';
import { Toggle } from '@/components/ui/toggle';
import { ChangeEvent, Suspense, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiImage } from 'react-icons/fi';
import 'swiper/swiper-bundle.css';
import { useAuthStore } from '@/store/auth/useAuthStore';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useFetchOneFeed } from '@/app/lib/feed/hook/useFetchOneFeed';
import { CarouselMultipleComponent } from '@/components/ui/carousel-multiple';
import { useUploadFeed } from '@/app/lib/feed/hook/useUploadFeed';
import { useUpdateFeed } from '@/app/lib/feed/hook/useUpdateFeed';

interface feedFormInputs {
  price: string;
  content: string;
  priceOption: boolean;
}

const FeedForm = () => {
  const searchParams = useSearchParams();
  const isEdit = searchParams.get('isEdit') === 'true'; // 게시글 수정 여부
  const feedId = searchParams.get('feedId'); // 게시글 id

  const result = useFetchOneFeed(feedId || '');
  const editFeed = result?.data && result?.data[0];
  const editFeedInfo = { ...editFeed, feedId };
  console.log('??????', editFeed, feedId);

  const fileInputRef = useRef<HTMLInputElement>(null); // 이미지 등록 input
  const [oldImages, setOldImages] = useState<string[]>(); // 이미 추가된 이미지들
  const [previewImages, setPreviewImages] = useState<File[]>(); //새롭게 추가할 이미지들
  const [willDeleteImgs, setWillDeleteImgs] = useState<string[]>([]); // 삭제할 이미지 이름들

  const uploadFn = useUploadFeed();
  const updateFn = useUpdateFeed();
  const { user } = useAuthStore();

  const { register, setValue, getValues, watch, handleSubmit } = useForm({
    defaultValues: {
      price: '0',
      priceOption: false,
      content: '',
    },
  });

  const onSubmit = (data: feedFormInputs) => {
    if (!isEdit) {
      uploadFn.mutate({
        ...data,
        userId: user?.uid as string,
        previewImage: previewImages || [],
      });
    } else {
      updateFn.mutate({
        ...data,
        userId: user?.uid as string,
        willDeleteImgs: willDeleteImgs ? willDeleteImgs : [],
        previewImage: previewImages ? previewImages : [],
        feedId: editFeedInfo.feedId as string,
      });
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleUploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (file && file.length > 0) {
      const fileArray = Array.from(file);
      setPreviewImages(fileArray);
    }
  };
  // 기존 이미지 x 버튼 클릭
  const handleDelImg = (index: number, item: string) => {
    console.log(index, oldImages);
    if (!oldImages) return;
    const deletedImg = oldImages.filter((_, idx) => idx !== index);
    console.log(oldImages, deletedImg);
    setWillDeleteImgs([...willDeleteImgs, item]);
    setOldImages(deletedImg);
  };
  // 새 이미지 x 버튼 클릭
  const handleDelPreviewImg = (index: number, name: string) => {
    console.log('del img name', name);
    const deletedImg = previewImages?.filter((_, idx) => idx !== index);
    setPreviewImages(deletedImg);
  };

  useEffect(() => {
    if (isEdit && editFeedInfo) {
      setValue('price', editFeedInfo.price?.toString());
      setValue('content', editFeedInfo.content);
    }
  }, [isEdit, editFeedInfo]);

  useEffect(() => {
    const imgUrls = editFeedInfo.images?.split(',');
    setOldImages(imgUrls);
  }, [editFeedInfo?.images]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex-1 flex flex-col">
      <div className="flex-1 flex flex-col">
        <div className="flex pt-5 pb-5 border-b">
          <div className="min-w-[100px]">소비 일자</div>
          {isEdit
            ? editFeedInfo.createdAt
            : new Date().getFullYear() +
              '년 ' +
              (new Date().getMonth() + 1) +
              '월 ' +
              new Date().getDate() +
              '일'}
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
          <input type="hidden" {...register('priceOption')}></input>
          <Toggle
            variant="outline"
            size="sm"
            onClick={() => {
              const prev = getValues('priceOption');
              setValue('priceOption', !prev);
            }}
          >
            {!watch('priceOption') ? '금액 보이기' : '금액 숨기기'}
          </Toggle>
        </div>
        <div className="w-full">
          <textarea
            id="content"
            placeholder="오늘 당신의 소비내용을 기록해주세요."
            className="min-h-44 h-44 resize-none w-full p-2"
            {...register('content', { required: true })}
          ></textarea>
          <div className="flex gap-2">
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
            <CarouselMultipleComponent
              images={oldImages}
              previewImages={previewImages}
              handleDelImg={handleDelImg}
              handleDelPreviewImg={handleDelPreviewImg}
            />
          </div>
        </div>
        <div className="flex-1 flex overflow-hidden ">
          <Button size="full" type="submit">
            {isEdit ? '게시글 수정' : '게시글 추가'}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FeedForm />
    </Suspense>
  );
}
