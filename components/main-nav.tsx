'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function MainNav() {
  const pathname = usePathname();

  return (
    <div className='mr-4 hidden md:flex'>
      <nav className='flex items-center space-x-8 text-base font-normal'>
        <Link
          key='home'
          href='/'
          className={
            pathname === '/'
              ? 'text-zinc-300 hover:text-zinc-400'
              : 'text-zinc-500 hover:text-zinc-400'
          }
        >
          Home
        </Link>
        <Link
          key='prompt'
          href='/prompt'
          className={
            pathname.startsWith('/prompt')
              ? 'text-zinc-300 hover:text-zinc-400'
              : 'text-zinc-500 hover:text-zinc-400'
          }
        >
          Prompt
        </Link>
      </nav>
    </div>
  );
}
