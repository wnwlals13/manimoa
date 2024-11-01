export default function Layout({
  children,
  userFeeds,
  userInfo,
}: {
  children: React.ReactNode;
  userFeeds: React.ReactNode;
  userInfo: React.ReactNode;
}) {
  return (
    <>
      {children}
      {userInfo}
      {userFeeds}
    </>
  );
}
