export default function FeedItemSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="flex p-default">
        <div className="flex-1 flex items-center gap-2 ">
          <div className="w-[40px] h-[40px] bg-gray-200 rounded-full leading-9"></div>
          <div className="flex-1">
            <div className="w-[100px] h-[20px] bg-gray-200"></div>
          </div>
          <div className="w-[70px] h-[40px]  rounded-md"></div>
        </div>
      </div>
      <div className="w-full h-[300px] bg-gray-200 "></div>
      <div className="pt-default flex flex-col gap-2 ">
        <div className="w-[350px] h-[20px] bg-gray-200"></div>
        <div className="w-[250px] h-[20px] bg-gray-200"></div>
      </div>
    </div>
  );
}
