import type { Metadata } from 'next';
import './globals.css';
import QueryProviders from './provider';
import { CustomToastContainer } from '@/components/toasts/components';
import { SocketProvider } from '@/store/socket/provider';
import LoadingSpinner from '@/components/ui/spinner/loading-spinner';

export const metadata: Metadata = {
  title: 'manimoa',
  description: '소비 습관 형성 어플리케이션, 마니모아',
};

export default function RootLayout({
  modal,
  children,
}: Readonly<{
  modal: React.ReactNode;
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="h-screen">
        <QueryProviders>
          <SocketProvider>
            <main className="flex flex-col relative w-[600px] min-w-custom max-w-custom min-h-screen m-auto bg-white shadow-xl">
              {children}
            </main>
            <LoadingSpinner />
            {modal}
            <div id="modal-root" className=""></div>
          </SocketProvider>
          {/* Loading */}
        </QueryProviders>
        <CustomToastContainer />
      </body>
    </html>
  );
}
