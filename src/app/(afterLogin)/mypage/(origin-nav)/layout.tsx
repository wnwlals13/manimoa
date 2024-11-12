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
    <div className="h-full max-h-full p-default pt-[60px] pb-[60px]">
      {children}
      {userInfo}
      {userGoals}
      {userFeeds}
    </div>
  );
}
