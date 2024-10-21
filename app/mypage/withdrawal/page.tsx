import { searchParamsCache } from '@/lib/searchparams';
import UserWithdrawalListingPage from '@/sections/userwithdrawal/views/user-withdrawal-listing-page';
import { SearchParams } from 'nuqs/parsers';
import React from 'react';

type pageProps = {
  searchParams: SearchParams;
};

export const metadata = {
  title: 'MyPage : Withdrawal'
};

export default async function Page({ searchParams }: pageProps) {
  // Allow nested RSCs to access the search params (in a type-safe way)
  searchParamsCache.parse(searchParams);

  return <UserWithdrawalListingPage />;
}
