export default function Layout({
  children,
  userInfo,
}: {
  children: React.ReactNode;
  userInfo: React.ReactNode;
}) {
  return (
    <>
      {children}
      {userInfo}
    </>
  );
}
