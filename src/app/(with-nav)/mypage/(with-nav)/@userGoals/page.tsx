'use client';

import { Progress } from '@/components/ui/progress';
import { GoalData } from '@/types';
import Link from 'next/link';
import { FiCheck } from 'react-icons/fi';
import { useFetchExpenseInfo } from '@/app/lib/user/hook/useFetchExpenseInfo';
import { IExpenseInfo } from '@/app/lib/user/api';
import { useAuthStore } from '@/store/auth/useAuthStore';

export default function Page() {
  const { user } = useAuthStore();
  const [expenseQuery, monthlyQuery] = useFetchExpenseInfo(user?.uid as string);

  if (expenseQuery.isLoading || monthlyQuery.isLoading)
    return <div>Loading...</div>;

  const expense = expenseQuery.data as IExpenseInfo;
  const monthExpense = monthlyQuery.data as string;

  const priceFormat = (num: number) => {
    return num.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
  };

  const calculateProgress = () => {
    return (Number(monthExpense) / Number(expense.price)) * 100;
  };

  const progressMsg = (): string => {
    const val = (Number(monthExpense) / Number(expense.price)) * 100;

    if (25 < val && val < 5) {
      return `👍 불필요한 지출은 줄이고 여유를 찾아보세요.`;
    } else if (50 < val && val < 75) {
      return `현명한 소비 계획을 세우고 미래의 행복을 키워보세요! :)`;
    } else if (75 < val && val < 100) {
      return `미래를 위한 투자를 하는 당신께 박수를!👏`;
    }
    return `👏 당신은 절약왕! 아낀만큼 주변사람들과의 관계도 챙겨보세요!`;
  };

  return (
    <div>
      <Link
        href={`/mypage/edit-goals`}
        className="inline-block w-full bg-main p-default rounded-xl"
      >
        <h3 className="font-bold mb-2 text-white">이번 달의 소비 목표!</h3>
        {expense.price ? (
          <>
            <div className="flex items-center gap-2">
              <Progress className="bg-white" value={calculateProgress()} />
              <p className="text-white">
                {priceFormat(Number(monthExpense))}/
                {priceFormat(Number(expense.price))}
              </p>
            </div>
            <p className="text-white">{progressMsg()}</p>
          </>
        ) : (
          <p>아직 소비 목표액을 설정하지 않았어요! 목표를 설정해보세요</p>
        )}
      </Link>
      <div className="">
        {expense.goals &&
          expense.goals.map((goal: GoalData, idx: number) => (
            <div key={idx} className="flex items-start gap-3 mb-2 mt-2">
              <div className="min-w-[20px]">
                <FiCheck color="blue" size={20} />
              </div>
              <p className="flex-1 max-h-[50px] text-ellipsis overflow-hidden break-words line-clamp-2">
                {goal.content}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}
