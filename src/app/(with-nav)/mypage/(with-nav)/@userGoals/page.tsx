import { getInfoAndGoals } from '@/app/lib/user/api';
import { GoalData } from '@/types';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { FiCheck } from 'react-icons/fi';

export default async function Page() {
  const cookieStore = cookies().get('user')?.value as string;
  const loginUser = JSON.parse(cookieStore);
  const { uid } = loginUser;
  const data = await getInfoAndGoals(uid);

  const priceFormat = (num: number) => {
    return num.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <div>
      <Link
        href={`/mypage/edit-goals`}
        className="inline-block w-full bg-main p-default rounded-xl"
      >
        <h3 className="font-bold mb-2">이번 달의 소비 목표!</h3>
        {data.price.length > 0 ? (
          <>
            <div className="flex items-center gap-2">
              <div className="bg-white h-2 rounded-lg flex-1" />
              <p className="text-white">
                0/{priceFormat(data?.price[0].price)}
              </p>
            </div>
            <p>👏 당신은 절약왕! 아낀만큼 주변사람들과의 관계도 챙겨보세요!</p>
          </>
        ) : (
          <p>아직 소비 목표액을 설정하지 않았어요! 목표를 설정해보세요</p>
        )}
      </Link>
      <div className="">
        {data?.goals &&
          data?.goals.map((goal: GoalData, idx: number) => (
            <div key={idx} className="flex items-center gap-3 mb-2 mt-2">
              <FiCheck color="blue" />
              <p>{goal.content}</p>
            </div>
          ))}
      </div>
    </div>
  );
}
