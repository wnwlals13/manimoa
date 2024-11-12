import React, { ChangeEvent, useRef } from 'react';
import { FiImage } from 'react-icons/fi';

interface ImageInputProps {
  setPreviewImgs: (value: File[]) => void;
  onImageChange: (value: File[]) => void;
}

export default function ImageInput({
  setPreviewImgs,
  onImageChange,
}: ImageInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null); // 이미지 등록 input

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  // 이미지 업로드 함수
  const handleUploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (file && file.length > 0) {
      const fileArray = Array.from(file);
      setPreviewImgs(fileArray);
      onImageChange(fileArray);
    }
  };

  return (
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
  );
}
