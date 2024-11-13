export default function MyGoalSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="flex p-default">
        <div className="flex-1 flex flex-col items-start gap-2 ">
          <div className="w-full h-[100px] rounded-md bg-gray-200"></div>
          <div className="flex-1 flex flex-col gap-1">
            <div className="w-[300px] h-[20px] bg-gray-200"></div>
            <div className="w-[300px] h-[20px] bg-gray-200"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
