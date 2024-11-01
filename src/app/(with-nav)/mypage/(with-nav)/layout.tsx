export default function Layout({
  children,
  userFeeds,
  userGoal,
  userInfo,
}: {
  children: React.ReactNode;
  userFeeds: React.ReactNode;
  userGoal: React.ReactNode;
  userInfo: React.ReactNode;
}) {
  return (
    <>
      {children}
      {userInfo}
      {userGoal}
      {userFeeds}
    </>
  );
}
