export default function ChatItemSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="flex pl-default pr-default p-2">
        <div className="flex-1 flex items-center gap-2 ">
          <div className="w-[50px] h-[50px] bg-gray-200 rounded-full leading-9"></div>
          <div className="flex-1">
            <div className="w-[150px] h-[20px] bg-gray-200"></div>
          </div>
          <div className="w-[50px] h-[20px] bg-gray-200"></div>
        </div>
      </div>
    </div>
  );
}
