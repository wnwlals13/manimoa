'use client';

import { useInfoAndGoals } from '@/app/lib/user/hook/useInfoAndGoals';
import { useUpdateGoals } from '@/app/lib/user/hook/useUpdateGoals';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GoalData } from '@/types';
import { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';

interface ExpenseFormInputs {
  month_price: string;
  month_goals: { value: string }[];
}

export default function Page() {
  const { mutate } = useUpdateGoals();
  const { data, isLoading, isSuccess } = useInfoAndGoals();
  const [tempGoal, setTempGoal] = useState<string[]>([]);
  const [tempPrice, setTempPrice] = useState<string>();

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
    mutate({ ...data, month_goals: filtered, month_price: data.month_price });
  };

  useEffect(() => {
    if (isLoading) return;

    // 목표 다짐이 있다면 설정
    if (data && data?.goals.length > 0) {
      // form 형태에 맞게 {value:string} 으로 설정해주어야 함
      const goalsArr = data.goals.map((item: GoalData) => {
        return { value: item.content };
      });
      const tempGoalsArr = data.goals.map((item: GoalData) => {
        return item.content;
      });
      setTempGoal(tempGoalsArr);
      setValue('month_goals', goalsArr);
    }

    // 목표 소비 금액이 있다면 설정
    if (data && data?.price.length > 0) {
      setTempPrice(data.price[0].price);
      setValue('month_price', data.price[0].price);
    }
  }, [isLoading, isSuccess, data]);

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
