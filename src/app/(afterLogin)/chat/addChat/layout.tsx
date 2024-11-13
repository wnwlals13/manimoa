import SearchBar from '@/components/chat/searchBar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-1 flex flex-col h-full p-default pt-[65px]">
      <SearchBar />
      {children}
    </div>
  );
}
