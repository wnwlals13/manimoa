import { SessionPayload } from '@/app/lib/definitions';
import { decrypt } from '@/app/lib/session';
import InteractiveButton from '@/components/ui/interactiveButton';
import { GoalData } from '@/types';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { Suspense } from 'react';
import { FiCheck } from 'react-icons/fi';

async function UserInfo({ loginUser }: { loginUser: SessionPayload }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/profile?q=${loginUser.uid}`,
    {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  const {
    data: { followCnt, followingCnt },
  } = await response.json();

  return (
    <div className="flex flex-col gap-2 p-default">
      <div className="relative flex  justify-between items-center">
        <div className="flex gap-10 justify-start items-center">
          <div className="flex gap-2 items-center">
            <div className="w-[50px] h-[50px] rounded-full flex justify-center items-center">
              <img
                // src={`${userData.profileImg}`}
                alt=""
                style={{ width: '50px', height: '50px' }}
              />
            </div>
            <p>{loginUser.email}</p>
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

async function ExpenseGoal({ loginUser }: { loginUser: SessionPayload }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/goal?q=${loginUser.uid}`,
    {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  const { goals } = await response.json();

  return (
    <>
      <Link
        href={`/user/expense-goals/edit`}
        className="inline-block w-full bg-main p-default rounded-xl"
      >
        <h3 className="font-bold mb-2">이번 달의 소비 목표!</h3>
        <div className="flex items-center gap-2">
          <div className="bg-white h-2 rounded-lg flex-1" />
          <p>10/100</p>
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
  const session = cookies().get('accessToken')?.value;
  const loginUser = (await decrypt(session)) as SessionPayload;
  return (
    <>
      <Suspense fallback={<div>loading....</div>}>
        <UserInfo loginUser={loginUser} />
      </Suspense>
      <Suspense fallback={<div>loading...</div>}>
        <ExpenseGoal loginUser={loginUser} />
      </Suspense>
      <div>{/* 월별 feed */}</div>
    </>
  );
}
