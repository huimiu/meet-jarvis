import './globals.css';

import { MainNav } from '@/components/main-nav';
import { ThemeProvider } from '@/components/theme-provider';
import { Separator } from '@/components/ui/separator';
import { Toaster } from '@/components/ui/toaster';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Jarvis',
  description: 'The AI Assistant for working and living better.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className='bg-zinc-950 font-sans'>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <div className='h-full flex-col md:flex'>
            <div className='container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16'>
              <MainNav />
            </div>
            <Separator />
            <main>{children}</main>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
