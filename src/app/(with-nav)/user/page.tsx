import InteractiveButton from '@/components/ui/interactiveButton';
import { GoalData } from '@/types';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import { FiCheck } from 'react-icons/fi';

async function UserInfo({ userId, email }: { userId: string; email: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/profile?q=${userId}`,
    {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { tags: ['profile'] },
    },
  );
  const { data } = await response.json();
  const followCnt = data.followCnt;
  const followingCnt = data.followingCnt;
  const cookieStore = cookies().get('user');
  const user = JSON.parse(cookieStore?.value as string);

  return (
    <div className="flex flex-col gap-2 p-default">
      <div className="relative flex  justify-between items-center">
        <div className="flex gap-10 justify-start items-center">
          <div className="flex gap-2 items-center">
            <div className="w-[50px] h-[50px] rounded-full flex justify-center items-center ">
              {user.profileImg ? (
                <Image
                  width={50}
                  height={50}
                  src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${process.env.NEXT_PUBLIC_STORAGE_BUCKET}/${user?.profileImg}`}
                  alt=""
                  style={{ width: '100%', height: '100%', borderRadius: '50%' }}
                />
              ) : (
                <div className="w-[50px] h-[50px] bg-gray-200 rounded-full"></div>
              )}
            </div>
            <p>{email}</p>
          </div>
          <div className="flex gap-2">
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

async function ExpenseGoal({ userId }: { userId: string }) {
  // 소비 목표 금액 & 다짐 정보 조회
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/goal?q=${userId}`,
    {
      // next: { tags: ['goals'] },
    },
  );
  const { goals, price } = await response.json();

  return (
    <>
      <Link
        href={`/user/edit-goals`}
        className="inline-block w-full bg-main p-default rounded-xl"
      >
        <h3 className="font-bold mb-2">이번 달의 소비 목표!</h3>
        <div className="flex items-center gap-2">
          <div className="bg-white h-2 rounded-lg flex-1" />
          <p>10/{price[0]?.price}</p>
        </div>
        <p>👏 당신은 절약왕! 아낀만큼 주변사람들과의 관계도 챙겨보세요!</p>
      </Link>
      <div>
        {goals &&
          goals.map((goal: GoalData, idx: number) => (
            <div key={idx} className="flex items-center gap-3">
              <FiCheck />
              <p>{goal.content}</p>
            </div>
          ))}
      </div>
    </>
  );
}

export default async function Page() {
  const cookieStore = cookies().get('user')?.value as string;
  const loginUser = JSON.parse(cookieStore);

  return (
    <>
      <Suspense fallback={<div>loading....</div>}>
        <UserInfo userId={loginUser.uid || ''} email={loginUser.email || ''} />
      </Suspense>
      <Suspense fallback={<div>loading...</div>}>
        <ExpenseGoal userId={loginUser.uid || ''} />
      </Suspense>
      <div>{/* 월별 feed */}</div>
    </>
  );
}
