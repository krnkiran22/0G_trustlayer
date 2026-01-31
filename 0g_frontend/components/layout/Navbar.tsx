'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShieldCheckIcon } from '@heroicons/react/24/solid';
import Container from './Container';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Analyze', href: '/analyze' },
  { name: 'Chat', href: '/chat' },
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'About', href: '/about' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-primary-800/20 bg-white/95 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 group">
              <ShieldCheckIcon className="h-8 w-8 text-primary-600 group-hover:text-primary-700 transition-colors" />
              <span className="text-xl font-bold bg-gradient-to-r from-primary-600 via-accent-500 to-primary-700 bg-clip-text text-transparent">
                SafeGuard AI
              </span>
            </Link>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary-600',
                  pathname === item.href
                    ? 'text-primary-600 font-semibold'
                    : 'text-slate-700'
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" asChild className="border-primary-600 text-primary-600 hover:bg-primary-50 hover:border-primary-700 transition-all">
              <Link href="/analyze">Get Started</Link>
            </Button>
          </div>
        </div>
      </Container>
    </nav>
  );
}
