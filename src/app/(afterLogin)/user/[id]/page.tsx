import UserFeedsList from '@/components/user/user-feeds-list';
import UserProfileInfo from '@/components/user/user-profile-info';
import { cookies } from 'next/headers';

// 회원정보 메타데이터
export async function generateMetadata({ params }: { params: { id: string } }) {
  const { id } = await params;
  const cookieStore = cookies().get('user')?.value as string;
  const loginUser = JSON.parse(cookieStore);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/getInfo?userId=${id}&loginId=${loginUser.uid}`,
    {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { tags: [`profile-${id}`] },
    },
  );

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const { user } = await response.json();

  return {
    title: `${user.name} 회원 정보`,
    description: `${user.email}`,
    openGraph: {
      title: `${user.name} 회원 정보`,
      description: `${user.email}`,
      images: [user.profileImg],
    },
  };
}

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div className="mt-[60px]">
      <UserProfileInfo userId={params.id} />
      <UserFeedsList userId={params.id} />
    </div>
  );
}
