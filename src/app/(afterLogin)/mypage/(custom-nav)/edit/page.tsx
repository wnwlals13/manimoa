'use client';

import { Button } from '@/components/ui/button/button';
import { Input } from '@/components/ui/inputs/input';
import { useAuthStore } from '@/store/auth/useAuthStore';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiEdit2 } from 'react-icons/fi';
import { useUpdateInfo } from '@/lib/user/hook/useUpdateInfo';
import { UserData } from '@/types';
import Profile from '@/components/ui/profile';
import {
  handleRemoveImageFromStorage,
  handleUploadImageToStorage,
} from '@/util/imageUpload';

export interface ProfileFormInputs {
  name: string;
  path?: string;
}

export default function Page() {
  const { user } = useAuthStore();
  const [tempName, setTempName] = useState<string>(user?.name || '');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImg, setPreviewImg] = useState<File>();

  const { register, handleSubmit, setValue } = useForm<ProfileFormInputs>({
    defaultValues: { name: user?.name },
  });
  const { mutate } = useUpdateInfo(user as UserData);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreviewImg(file); // state 설정
  };

  const onSubmit = async (data: ProfileFormInputs) => {
    if (!user) return;

    let path = user?.profileImg || null;

    if (user?.profileImg) handleRemoveImageFromStorage(user?.profileImg);
    if (previewImg) {
      path = await handleUploadImageToStorage({
        file: previewImg,
        type: 'profile',
        userId: user.uid,
      });
    }
    // 2. 이미지 path 가져와 db에 저장
    const props = { name: data.name, profileImg: path, userId: user?.uid };

    // 3. 수정
    mutate(props);
  };

  useEffect(() => {
    setTempName(user?.name || '');
    setValue('name', tempName || '');
  }, [user]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex-1 flex flex-col justify-between items-center gap-5 p-default pt-[60px]"
    >
      <div className="w-full flex flex-col">
        <div className="h-[100px] w-full flex justify-center">
          <div className="profile-btn w-[100px] h-[100px] rounded-full absolute">
            {previewImg ? (
              <div className="profile-btn w-[100px] h-[100px] rounded-full border border-gray-200 absolute overflow-hidden flex justify-center">
                <Image
                  width={100}
                  height={100}
                  style={{ objectFit: 'cover' }}
                  alt="프로필 이미지"
                  src={URL.createObjectURL(previewImg)}
                ></Image>
              </div>
            ) : (
              <Profile src={user?.profileImg as string} size="xlg" />
            )}
            <div className="absolute bottom-0 right-0 p-2 border border-gray-300 rounded-full bg-white cursor-pointer">
              <div onClick={handleClick}>
                <FiEdit2 />
              </div>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleImageChange}
              />
            </div>
          </div>
        </div>
        <div className="w-full">
          <label htmlFor="name">이름</label>
          <Input
            value={tempName}
            {...register('name')}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTempName(e.target.value)
            }
          />
        </div>
      </div>
      <Button variant="default" size="full" type="submit">
        저장하기
      </Button>
    </form>
  );
}
