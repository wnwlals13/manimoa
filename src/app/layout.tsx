import type { Metadata } from 'next';
import './globals.css';
import QueryProviders from './provider';

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
          <main className="flex flex-col relative w-[600px] min-w-custom max-w-custom min-h-screen m-auto bg-white shadow-xl">
            {children}
          </main>
          {modal}
          <div id="modal-root" className=""></div>
        </QueryProviders>
      </body>
    </html>
  );
}
