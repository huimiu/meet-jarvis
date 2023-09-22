'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const examples = [
  {
    name: 'Home',
    href: '/',
  },
  {
    name: 'Prompts',
    href: '/prompts',
  },
];

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();

  return (
    <div className='mr-4 hidden md:flex'>
      <nav className='flex items-center space-x-8 text-sm font-normal'>
        {examples.map((e) => (
          <Link
            href={e.href}
            className={
              pathname === e.href
                ? 'text-zinc-300 hover:text-zinc-400'
                : 'text-zinc-500 hover:text-zinc-400'
            }
          >
            {e.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}
