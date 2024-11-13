'use client';

import { useLoadingStore } from '@/store/loading/loadingStore';

export default function LoadingSpinner() {
  const { loading } = useLoadingStore();

  if (!loading) return null;

  return (
    <div className="fixed z-50 bottom-0 left-0 right-0 top-0 flex items-center justify-center p-default bg-[rgba(255,255,255,0.9)]">
      <div className="w-[100px] h-[100px] p-default rounded-md">
        <div className="w-full h-full animate-spin rounded-full border-4 border-gray-400 border-opacity-30 border-t-main"></div>
      </div>
    </div>
  );
}
