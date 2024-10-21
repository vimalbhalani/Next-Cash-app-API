'use client';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export function UserNav() {

  // Get the string from localStorage
  const userInfoStr = localStorage.getItem('userinfo')
  const userInfo = userInfoStr ? JSON.parse(userInfoStr) : {};

  const router = useRouter();
  const signOut = () => {
    localStorage.clear();
    router.push("/");
  }
  const ok=()=>{}
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button  variant="outline" size="icon" handleClick={ok}>
          <Image src='/log-out.png' width={25} height={25} alt='log-out'/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {userInfo.name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {userInfo.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
  // }
}
