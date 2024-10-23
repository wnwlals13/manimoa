'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuthStore } from '@/store/auth/useAuthStore';
import { GoalData } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';

interface ExpenseFormInputs {
  month_price: string;
  month_goals: { value: string }[];
}

export default function Page() {
  const { user } = useAuthStore();
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
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/goal/edit`,
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
    // [TODO] 빈칸인 인풋은 삭제할 수 있도록
    mutate(data);
  };

  useEffect(() => {
    const getGoals = async () => {
      const result = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/goal?q=${user?.uid}`,
        { method: 'get', headers: { 'Content-Type': 'application/json' } },
      );
      const data = await result.json();

      if (data.goals) {
        const datas = data.goals.map((item: GoalData) => {
          return item.content;
        });
        const result_goals = data.goals.map((item: GoalData) => {
          return { value: item.content };
        });
        setTempGoal(datas);
        setValue('month_goals', datas);
        console.log('data goals =>', result_goals);
      }
      if (data.price) {
        // console.log(data.goals, data.price[0], tempPrice);
        setTempPrice(data.price[0]);
        setValue('month_price', data.price[0]);
      }
    };
    getGoals();
  }, []);

  useEffect(() => {
    console.log('/expense-goals/', tempGoal, fields, tempPrice);
  }, [tempGoal]);

  return (
    <form
      className="flex-1 flex flex-col gap-5 justify-between h-full"
      onSubmit={handleSubmit(onsubmit)}
    >
      <div className="flex flex-col gap-10">
        <div>
          <h3 className="mb-2">이번 달 목표 소비금액</h3>
          <Input
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
                <Input
                  key={idx}
                  // value={field.value}
                  defaultValue={field.value}
                  className="mb-2 border"
                  {...register(`month_goals.${idx}`)}
                />
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
