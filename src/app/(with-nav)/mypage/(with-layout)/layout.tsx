export default function Layout({
  children,
  userGoals,
  userInfo,
  userFeeds,
}: {
  children: React.ReactNode;
  userGoals: React.ReactNode;
  userInfo: React.ReactNode;
  userFeeds: React.ReactNode;
}) {
  return (
    <>
      {userInfo}
      {userGoals}
      {userFeeds}
      {children}
    </>
  );
}
