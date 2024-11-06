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
    <div className="pb-[60px] p-default">
      {children}
      {userInfo}
      {userGoals}
      {userFeeds}
    </div>
  );
}
