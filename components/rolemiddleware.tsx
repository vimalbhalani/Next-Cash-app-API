'use client';

import NotFound from '@/app/not-found';
import React from 'react';

export default function RoleMiddleware({
  children,
  accessRight
}: {
  children: React.ReactNode;
  accessRight: string;
}) {
  const userInfoStr = localStorage.getItem('userinfo');
  const userInfo = userInfoStr ? JSON.parse(userInfoStr) : {};

  if (userInfo.role === accessRight) {
    return <div>{children}</div>;
  } else {
    return <NotFound />;
  }
}
