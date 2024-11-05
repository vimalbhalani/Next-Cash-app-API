'use client';

import { useSearchParams } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useEffect } from 'react';

export default function GoogleSignUpButton() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      // User is authenticated, you can access session data here
      localStorage.setItem('userinfo', JSON.stringify(session.userInfo));
    }
  }, [session, status]);

  return (
    <Button
      className="w-full"
      variant="outline"
      type="button"
      onClick={() =>
        signIn('google', { callbackUrl: callbackUrl ?? '/mypage' })
      }
    >
      <Image src='/google.png' width={20} height={20} alt='google icon' className='mr-3' />
      Continue with Google
    </Button>
  );
}
