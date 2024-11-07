'use client';

import { IExpenseInfo } from '@/app/lib/user/api';
import { useInfoAndGoals } from '@/app/lib/user/hook/useInfoAndGoals';
import { useUpdateGoals } from '@/app/lib/user/hook/useUpdateGoals';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuthStore } from '@/store/auth/useAuthStore';
import { GoalData } from '@/types';
import { Suspense, useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';

interface ExpenseFormInputs {
  month_price: string;
  month_goals: { value: string }[];
}

function EditGoalsForm() {
  const { user } = useAuthStore();

  const { mutate } = useUpdateGoals();
  const { data, isLoading, isSuccess } = useInfoAndGoals(user?.uid as string);
  const expense = data as IExpenseInfo;

  const [tempGoal, setTempGoal] = useState<string[]>([]);
  const [tempPrice, setTempPrice] = useState<string>();
  console.log('edit-goals', data);
  const { control, register, handleSubmit, setValue } =
    useForm<ExpenseFormInputs>({
      defaultValues: {
        month_price: '',
        month_goals: [{ value: '' }],
      },
    });
  const { fields, append } = useFieldArray({
    control,
    name: 'month_goals',
  });

  const onsubmit = (data: ExpenseFormInputs) => {
    // 빈칸인 인풋은 삭제
    const filtered = data.month_goals.filter((item) => item.value != '');
    mutate({
      ...data,
      month_goals: filtered,
      month_price: data.month_price,
      userId: user?.uid as string,
    });
  };

  useEffect(() => {
    if (isLoading) return;

    // 목표 다짐이 있다면 설정
    if (expense && expense.goals.length > 0) {
      // form 형태에 맞게 {value:string} 으로 설정해주어야 함
      const goalsArr = expense.goals.map((item: GoalData) => {
        return { value: item.content };
      });
      const tempGoalsArr = expense.goals.map((item: GoalData) => {
        return item.content;
      });
      setTempGoal(tempGoalsArr);
      setValue('month_goals', goalsArr);
    }

    // 목표 소비 금액이 있다면 설정
    if (expense && expense.price) {
      setTempPrice(expense.price);
      setValue('month_price', expense.price);
    }
  }, [isLoading, isSuccess, data]);

  return (
    <form
      className="flex-1 flex flex-col gap-5 justify-between h-full p-default pt-[60px]"
      onSubmit={handleSubmit(onsubmit)}
    >
      <div className="flex flex-col gap-10">
        <div>
          <h3 className="mb-2">이번 달 목표 소비금액</h3>
          <Input
            defaultValue={tempPrice}
            placeholder="예) 1,000,000"
            type="number"
            {...register('month_price')}
          ></Input>
        </div>
        <div>
          <div className="flex justify-between items-center mb-3">
            <h3>이번 달의 소비 다짐!</h3>
            <Button
              variant="outline"
              onClick={(e: React.MouseEvent) => {
                e.preventDefault();
                if (fields.length == 5) {
                  alert('5개 까지만 추가가능합니다.');
                  return;
                }
                append({ value: '' });
              }}
            >
              + 추가
            </Button>
          </div>
          <div>
            {fields &&
              fields.map((field, idx) => (
                <li key={field.id} className="no-underline list-none">
                  <Input
                    defaultValue={tempGoal[idx]}
                    className="mb-2 border"
                    {...register(`month_goals.${idx}.value`)}
                  />
                </li>
              ))}
          </div>
        </div>
      </div>
      <Button variant="default" size="full">
        저장하기
      </Button>
    </form>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditGoalsForm />
    </Suspense>
  );
}
