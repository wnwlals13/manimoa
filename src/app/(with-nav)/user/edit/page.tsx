'use client';

import { updateUserProfile } from '@/app/actions/update-user-profile';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuthStore } from '@/store/auth/useAuthStore';
import { UserData } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiEdit2 } from 'react-icons/fi';

export interface ProfileFormInputs {
  profileImgUrl: string;
  name: string;
  email: string;
}

export default function Page() {
  const { user, setUser } = useAuthStore();
  const [tempName, setTempName] = useState<string>(user?.name || '');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // const [imgUrl, setImgUrl] = useState('');
  const [tempFile, setTempFile] = useState<File>();

  const { register, handleSubmit, setValue } = useForm<ProfileFormInputs>({
    defaultValues: { name: user?.name, email: user?.email },
  });

  const { mutate: updateUser } = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: (res) => {
      console.log(res);
      const userItem: UserData = {
        ...user,
        email: user?.email || '',
        name: tempName,
      };
      setUser(userItem);
    },
  });

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;
    setTempFile(file); // state 설정

    // 이미지 화면에 띄우기
    const reader = new FileReader();

    reader.readAsDataURL(file);
  };

  const onSubmit = (data: ProfileFormInputs) => {
    // const formData = new FormData();
    // if (tempFile) {
    //   // formdata 생성
    //   formData.append('image', tempFile);
    // }
    console.log(data, tempFile);
    if (data) updateUser(data);
  };

  useEffect(() => {
    setTempName(user?.name || '');
    setValue('name', tempName || '');
    setValue('email', user?.email || '');
    console.log(user);
  }, [user]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex-1 flex flex-col justify-between items-center gap-5"
    >
      <div className="w-full flex flex-col">
        <div className="h-[100px] w-full flex justify-center">
          <div className="profile-btn w-[100px] h-[100px] bg-gray-300 rounded-full absolute">
            <div className="profile-btn w-[100px] h-[100px] rounded-full border border-gray-200 absolute overflow-hidden flex justify-center">
              <img style={{ width: '100%' }}></img>
            </div>
            <div className="absolute bottom-0 right-0 p-2 border border-gray-300 rounded-full bg-white cursor-pointer">
              <div onClick={handleClick}>
                <FiEdit2 />
              </div>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                {...register('profileImgUrl')}
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
