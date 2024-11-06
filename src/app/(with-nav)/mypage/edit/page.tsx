'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuthStore } from '@/store/auth/useAuthStore';
import { createSupabaseClient } from '@/utils/supabase-client';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiEdit2 } from 'react-icons/fi';
import { useUpdateInfo } from '@/app/lib/user/hook/useUpdateInfo';
import { UserData } from '@/types';

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

  const uploadImg = async () => {
    const supabase = await createSupabaseClient();
    try {
      // 해당 id 폴더의 기존 데이터 삭제..
      const profile = user?.profileImg;
      if (profile) {
        await supabase.storage
          .from(process.env.NEXT_PUBLIC_STORAGE_BUCKET!)
          .remove([profile]);
      }

      const file = previewImg as File;
      const fileExt = file.name.split('.').pop();
      const filePath = `profile/${user?.uid}/${Date.now()}.${fileExt}`;

      const { data, error } = await supabase.storage
        .from(process.env.NEXT_PUBLIC_STORAGE_BUCKET!)
        .upload(filePath, file);

      if (error) {
        console.error('Failed to insert image to storage : ', error);
        throw new Error('[client] 프로필 이미지가 정상적으로 저장되지 않음');
      }

      return data.path;
    } catch (err) {
      console.error('[client] 프로필 이미지 저장 에러', err);
    }
  };

  const onSubmit = async (data: ProfileFormInputs) => {
    let path = user?.profileImg || undefined;
    if (previewImg) {
      // 1. 이미지 스토리지 저장
      path = (await uploadImg()) as string;
    }
    // 2. 이미지 path 가져와 db에 저장
    const props = { name: data.name, path };

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
          <div className="profile-btn w-[100px] h-[100px] bg-gray-300 rounded-full absolute">
            <div className="profile-btn w-[100px] h-[100px] rounded-full border border-gray-200 absolute overflow-hidden flex justify-center">
              {user?.profileImg ? (
                <Image
                  width={100}
                  height={100}
                  style={{ width: '100%' }}
                  alt="프로필 이미지"
                  src={
                    previewImg
                      ? URL.createObjectURL(previewImg)
                      : `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${process.env.NEXT_PUBLIC_STORAGE_BUCKET}/${user?.profileImg}`
                  }
                ></Image>
              ) : (
                previewImg && (
                  <Image
                    width={100}
                    height={100}
                    alt="프로필 이미지"
                    src={URL.createObjectURL(previewImg)}
                  ></Image>
                )
              )}
            </div>
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
