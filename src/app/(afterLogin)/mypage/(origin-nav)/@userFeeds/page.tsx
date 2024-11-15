'use client';

import { useAuthStore } from '@/store/auth/useAuthStore';
import UserFeedsList from '@/components/user/user-feeds-list';

export default function Page() {
  const { user } = useAuthStore();

  return <UserFeedsList userId={user?.uid as string} />;
}
