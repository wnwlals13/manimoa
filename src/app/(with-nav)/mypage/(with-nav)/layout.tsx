export default function Layout({
  children,
  userInfo,
  userFeeds,
  userGoals,
}: {
  children: React.ReactNode;
  userInfo: React.ReactNode;
  userFeeds: React.ReactNode;
  userGoals: React.ReactNode;
}) {
  return (
    <>
      {children}
      {userInfo}
      {userGoals}
      {userFeeds}
    </>
  );
}
