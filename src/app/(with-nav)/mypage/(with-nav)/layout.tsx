export default function Layout({
  children,
  userInfo,
  userFeeds,
}: {
  children: React.ReactNode;
  userInfo: React.ReactNode;
  userFeeds: React.ReactNode;
}) {
  return (
    <>
      {children}
      {userInfo}
      {userFeeds}
    </>
  );
}
