'use client';

import React from 'react';
import ThemeProvider from './ThemeToggle/theme-provider';
import { SessionProvider, SessionProviderProps } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
export default function Providers({
  session,
  children
}: {
  session: SessionProviderProps['session'];
  children: React.ReactNode;
}) {

  const userInfoStr = localStorage.getItem('userinfo')
  const userInfo = userInfoStr ? JSON.parse(userInfoStr) : {};

  const router = useRouter();

  const chatting = () => {
    router.push("/mypage/chat");
  }

  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <SessionProvider session={session}>
          {userInfo.role === "user" ?
            <Image src='/chat-image.png' width={60} height={60} alt='chatting'
              className='absolute right-5 sm:right-10 top-[87vh] sm:top-[90vh] z-50 cursor-pointer hover:scale-105'
              onClick={chatting}
            /> : ""
          }
          {children}
        </SessionProvider>
      </ThemeProvider>
    </>
  );
}
