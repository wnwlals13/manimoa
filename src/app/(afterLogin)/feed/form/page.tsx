'use client';

import { Toggle } from '@/components/ui/toggle';
import { ChangeEvent, Suspense, useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import 'swiper/swiper-bundle.css';
import { useAuthStore } from '@/store/auth/useAuthStore';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button/button';
import { useFetchOneFeed } from '@/lib/feed/hook/useFetchOneFeed';
import { useUploadFeed } from '@/lib/feed/hook/useUploadFeed';
import { useUpdateFeed } from '@/lib/feed/hook/useUpdateFeed';
import CustomTextArea from '@/components/ui/inputs/CustomTextArea/component';
import FormField from '@/components/ui/inputs/FormField/component';
import FeedImageList from '@/components/feed/feed-image-list';
import { formatChatDate } from '@/util/formatChatDate';

interface feedFormInputs {
  price: number;
  content: string;
  priceOption: boolean;
}

const FeedForm = () => {
  const searchParams = useSearchParams();
  const isEdit = searchParams.get('isEdit') === 'true'; // 게시글 수정 여부
  const feedId = searchParams.get('feedId'); // 게시글 id

  const { data: feed } = useFetchOneFeed(feedId);

  const { user } = useAuthStore();
  const uploadFn = useUploadFeed();
  const updateFn = useUpdateFeed();

  const { register, setValue, getValues, watch, handleSubmit } = useForm({
    defaultValues: {
      price: 0,
      priceOption: false,
      content: '',
    },
  });

  const [oldImgs, setOldImgs] = useState<string[]>(); // 이미 추가된 이미지들
  const [previewImgs, setPreviewImgs] = useState<File[]>(); //새롭게 추가할 이미지들
  const [willDeleteImgs, setWillDeleteImgs] = useState<string[]>([]); // 삭제할 이미지 이름들

  // 새로 피드 등록
  const onSubmit = (data: feedFormInputs) => {
    uploadFn.mutate({
      ...data,
      userId: user?.uid as string,
      previewImage: previewImgs || null,
    });
  };

  // 기존 피드 업데이트
  const onUpdate = (data: feedFormInputs) => {
    if (!feedId) return;

    updateFn.mutate({
      ...data,
      userId: user?.uid as string,
      willDeleteImgs: willDeleteImgs ? willDeleteImgs : [],
      previewImage: previewImgs ? previewImgs : [],
      feedId: feedId,
    });
  };

  const renderPriceOptionToggle = useCallback(() => {
    return !watch('priceOption') ? '금액 보이기' : '금액 숨기기';
  }, [getValues('priceOption')]);

  const renderPriceOptionText = useCallback(() => {
    return !watch('priceOption')
      ? '피드에는 노출되지 않습니다.'
      : '피드에 함께 보여집니다.';
  }, [getValues('priceOption')]);

  const handlePriceOption = useCallback(() => {
    const prev = getValues('priceOption');
    setValue('priceOption', !prev);
  }, [getValues('priceOption')]);

  const renderFormButton = useCallback(() => {
    return isEdit ? '게시글 수정' : '게시글 추가';
  }, [isEdit]);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      const num = e.target.value;
      setValue('price', Number(num));
    },
    [getValues('price')],
  );

  useEffect(() => {
    if (isEdit && feed) {
      // 수정인 경우, 기존의 정보 넣어주기
      setValue('price', Number(feed?.price));
      setValue('content', feed.content);
      const imgUrls = feed.images?.split(',');
      setOldImgs(imgUrls);
    }
  }, [isEdit, feed]);

  return (
    <form
      onSubmit={handleSubmit(isEdit ? onUpdate : onSubmit)}
      className="flex-1 flex flex-col p-default pt-[60px] h-screen"
    >
      <div className="flex-1 flex flex-col">
        <div className="flex pt-5 pb-5 border-b">
          <div className="min-w-[100px]">소비 일자</div>
          {formatChatDate(
            isEdit ? new Date(feed?.createdAt as string) : new Date(),
          )}
        </div>
        <div className="border-b pb-5 mb-5">
          <div className="flex gap-5 pt-5 items-center">
            <div className="flex-1 flex items-center">
              <div className="min-w-[100px]">오늘 소비</div>
              <FormField
                fieldType="number"
                onFieldChange={handleChange}
                {...register('price', { required: true })}
              />
            </div>
            <input type="hidden" {...register('priceOption')}></input>
            <Toggle variant="outline" size="sm" onClick={handlePriceOption}>
              {renderPriceOptionToggle()}
            </Toggle>
          </div>
          <div className="mt-1 pl-[100px] text-sm text-gray-400">
            {renderPriceOptionText()}
          </div>
        </div>
        <div className="flex-1 flex flex-col w-full gap-2">
          {/* TextArea Section */}
          <CustomTextArea
            id="content"
            placeholderText="오늘 당신의 소비내용을 기록해주세요."
            {...register('content', { required: true })}
          />
          {/* 이미지 추가 Section */}
          <FeedImageList
            oldImgs={oldImgs}
            willDeleteImgs={willDeleteImgs}
            previewImgs={previewImgs}
            setOldImgs={setOldImgs}
            setPreviewImgs={setPreviewImgs}
            setWillDeleteImgs={setWillDeleteImgs}
          />
        </div>
        <div className=" flex overflow-hidden ">
          <Button size="full" type="submit">
            {renderFormButton()}
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
