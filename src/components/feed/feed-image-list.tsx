import React from 'react';
import ImageInput from '../ui/inputs/ImageInput/component';
import { CarouselMultipleComponent } from '../ui/carousel/carousel-multiple';

interface FeedImageListProps {
  oldImgs?: string[];
  willDeleteImgs?: string[];
  previewImgs?: File[];
  setOldImgs: (value: string[]) => void;
  setWillDeleteImgs: (value: string[]) => void;
  setPreviewImgs: (value: File[]) => void;
}

export default function FeedImageList({
  oldImgs,
  willDeleteImgs,
  previewImgs,
  setOldImgs,
  setWillDeleteImgs,
  setPreviewImgs,
}: FeedImageListProps) {
  // 기존 이미지 x 버튼 클릭
  const handleDelImg = (index: number, item: string) => {
    if (!oldImgs) return;
    const deletedImg = oldImgs.filter((_, idx) => idx !== index);
    setWillDeleteImgs(willDeleteImgs ? [...willDeleteImgs, item] : [item]);
    setOldImgs(deletedImg);
  };

  // 새 이미지 x 버튼 클릭
  const handleDelPreviewImg = (index: number) => {
    const deletedImg = previewImgs?.filter((_, idx) => idx !== index) || [];
    setPreviewImgs(deletedImg);
  };

  const handleImage = (value: File[]) => {
    setPreviewImgs(value);
  };

  return (
    <div className="flex gap-2">
      <ImageInput setPreviewImgs={setPreviewImgs} onImageChange={handleImage} />
      <CarouselMultipleComponent
        images={oldImgs}
        previewImages={previewImgs}
        handleDelImg={handleDelImg}
        handleDelPreviewImg={handleDelPreviewImg}
      />
    </div>
  );
}
