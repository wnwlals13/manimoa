import InteractiveButton from '@/components/ui/interactiveButton';
import { cookies } from 'next/headers';
import Image from 'next/image';

const getAdditionalInfo = async (userId: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/mypage/profile?q=${userId}`,
    {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { tags: [`profile`] },
    },
  );
  if (!response.ok) {
    return { error: `팔로우/팔로잉 데이터 조회에 실패했습니다.` };
  }
  const result = await response.json();
  return result.data;
};

export default async function Page() {
  const cookieStore = cookies().get('user')?.value as string;
  const loginUser = JSON.parse(cookieStore);
  const { uid, email, name, profileImg } = loginUser;
  const { followCnt, followingCnt } = await getAdditionalInfo(uid);

  return (
    <div className="flex flex-col gap-2 pt-default pb-default">
      <div className="relative flex  justify-between items-center">
        <div className="flex-1 flex gap-10 justify-start items-center">
          <div className="flex gap-2 items-center">
            <div className="w-[50px] h-[50px] rounded-full flex justify-center items-center ">
              {profileImg ? (
                <Image
                  width={50}
                  height={50}
                  src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${process.env.NEXT_PUBLIC_STORAGE_BUCKET}/${profileImg}`}
                  alt=""
                  style={{ width: '100%', height: '100%', borderRadius: '50%' }}
                />
              ) : (
                <div className="w-[50px] h-[50px] bg-gray-200 rounded-full"></div>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <p>{email}</p>
              <p className="text-sm text-gray-500">{name}</p>
            </div>
          </div>
          <div className="flex-1 flex justify-center gap-2">
            <div className="flex">
              팔로우 <p>{followCnt}</p>
            </div>
            <div className="flex">
              팔로잉 <p>{followingCnt}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-2 mt-4">
        <InteractiveButton variant="outline" size="full" name="edit_profile">
          프로필 수정
        </InteractiveButton>
        <InteractiveButton variant="outline" size="full" name="logout">
          로그아웃
        </InteractiveButton>
      </div>
    </div>
  );
}
