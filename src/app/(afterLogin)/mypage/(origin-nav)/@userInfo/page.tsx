'use client';

import { useAuthStore } from '@/store/auth/useAuthStore';
import UserProfileInfo from '@/components/user/user-profile-info';

export default function Page() {
  const { user } = useAuthStore();

  return (
    <>
      <UserProfileInfo userId={user?.uid as string} />
    </>
  );
}
