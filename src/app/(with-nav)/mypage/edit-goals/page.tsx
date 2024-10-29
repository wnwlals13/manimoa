'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuthStore } from '@/store/auth/useAuthStore';
import { GoalData } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';

export interface goalsArrayProps {
  value: string;
}

interface ExpenseFormInputs {
  month_price: string;
  month_goals: goalsArrayProps[];
}

export default function Page() {
  const { user, setGoals } = useAuthStore();
  const [tempGoal, setTempGoal] = useState<string[]>([]);
  const [tempPrice, setTempPrice] = useState<string>('');

  const { control, register, handleSubmit, setValue } =
    useForm<ExpenseFormInputs>({
      defaultValues: { month_price: '', month_goals: [{ value: '' }] },
    });
  const { fields, append } = useFieldArray({
    control,
    name: 'month_goals',
  });

  const { mutate } = useMutation({
    mutationFn: async (data: ExpenseFormInputs) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/mypage/goal/edit`,
        {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        },
      );
      return await response.json();
    },
  });

  // function : 제출하기
  const onsubmit = (data: ExpenseFormInputs) => {
    // 빈칸인 인풋은 삭제
    const filtered = data.month_goals.filter((item) => item.value != '');
    mutate({ ...data, month_goals: filtered });
  };

  useEffect(() => {
    const getGoals = async () => {
      // 소비 목표 금액 & 다짐 정보 조회
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/mypage/goal?q=${user?.uid}`,
        { cache: 'no-cache' },
      );
      const { goals, price } = await response.json();

      // goals 형태 가공하기
      const values = goals.map((item: GoalData) => {
        return { value: item.content };
      });

      // tempGoal 형태 가공하기
      const values_temp = goals.map((item: GoalData) => item.content);

      setTempGoal(values_temp);
      setTempPrice(price[0]?.price);
      setValue('month_goals', values);
      setValue('month_price', price[0]?.price);
      setGoals(values_temp);
    };
    getGoals();
  }, []);

  return (
    <form
      className="flex-1 flex flex-col gap-5 justify-between h-full"
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
                // setTempGoal([...tempGoal, '']);
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
                    // value={field.value}
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
