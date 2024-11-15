'use client';
import React from 'react';
import ThemeProvider from './ThemeToggle/theme-provider';
import { SessionProvider, SessionProviderProps } from 'next-auth/react';
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
  if (!userInfo.token) {
    router.push("/");
  }
  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <SessionProvider session={session}>{children}</SessionProvider>
      </ThemeProvider>
    </>
  );
}
