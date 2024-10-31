export default function Layout({
  children,
  userGoals,
  userFeeds,
}: {
  children: React.ReactNode;
  userGoals: React.ReactNode;
  userFeeds: React.ReactNode;
}) {
  return (
    <>
      {children}
      {userGoals}
      {userFeeds}
    </>
  );
}
