import ThemeToggle from '@/components/layout/ThemeToggle/theme-toggle';
import { cn } from '@/lib/utils';
import { MobileSidebar } from './mobile-sidebar';
import { UserNav } from './user-nav';
import { UserAlarm } from './alarm';
import Image from 'next/image';

export default function Header() {

  return (
    <header className="sticky inset-x-0 top-0 w-full">
      <nav className="flex items-center justify-between px-4 py-2 md:justify-end">
        <div className='grid grid-cols-2 gap-3'>
        <div className={cn('block lg:!hidden')}>
          <MobileSidebar />
        </div>
        <Image src='/logo.png' width={25} height={25} alt='log-out' className='lg:!hidden'/>
        </div>
        <div className="flex items-center gap-2">
          <UserAlarm/>
          <ThemeToggle />
          <UserNav />
        </div>
      </nav>
    </header>
  );
}
