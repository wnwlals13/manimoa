export default function MyProfileSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="flex flex-col gap-3 p-default">
        <div className="flex-1 flex items-center gap-2 ">
          <div className="w-[75px] h-[75px] bg-gray-200 rounded-full leading-9"></div>
          <div className="flex-1 flex flex-col gap-1">
            <div className="w-[100px] h-[20px] bg-gray-200"></div>
          </div>
          <div className="flex-1 flex gap-1">
            <div className="w-[70px] h-[20px] bg-gray-200"></div>
            <div className="w-[70px] h-[20px] bg-gray-200"></div>
          </div>
        </div>
        <div className="flex-1 flex gap-1">
          <div className="w-full h-[40px] rounded-md bg-gray-200"></div>
          <div className="w-full h-[40px] rounded-md bg-gray-200"></div>
        </div>
      </div>
    </div>
  );
}
