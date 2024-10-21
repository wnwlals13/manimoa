'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuthStore } from '@/store/auth/useAuthStore';

export default function Page() {
  const { goals } = useAuthStore();
  console.log('goals', goals);
  return (
    <form className="flex flex-col gap-5 justify-between h-full">
      <div className="flex flex-col gap-10">
        <div>
          <h3 className="mb-2">이번 달 목표 소비금액</h3>
          <Input placeholder="예) 1,000,000"></Input>
        </div>
        <div>
          <div className="flex justify-between items-center mb-3">
            <h3>이번 달의 소비 다짐!</h3>
            <Button
              variant="outline"
              onClick={(e: React.MouseEvent) => {
                e.preventDefault();
                console.log('clicked');
              }}
            >
              + 추가
            </Button>
          </div>
          <div>
            {goals.map((item) => (
              <div key={item.id}>
                <Input value={item.content} onChange={() => {}} />
              </div>
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
