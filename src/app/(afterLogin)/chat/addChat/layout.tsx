import SearchBar from '@/components/chat/searchBar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-default pt-[65px]">
      <SearchBar />
      {children}
    </div>
  );
}
