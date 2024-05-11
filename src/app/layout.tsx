import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import Provider from '@/app/providers';
import Navbar from '@/components/Navbar';
import './globals.css';

export const metadata: Metadata = {
  title: 'PiWallet',
  description: 'The next generation credentials management app',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html data-theme={cookies().get('theme')?.value ?? 'cmyk'}>
      <body>
        <Provider>
          <Navbar />
          {children}
        </Provider>
      </body>
    </html>
  );
}
