import { searchParamsCache } from '@/lib/searchparams';
import UserDepositListingPage from '@/sections/userdeposit/views/user-deposit-listing-page';
import { SearchParams } from 'nuqs/parsers';
import React from 'react';

type pageProps = {
  searchParams: SearchParams;
};

export const metadata = {
  title: 'Main : Deposit'
};

export default async function Page({ searchParams }: pageProps) {
  // Allow nested RSCs to access the search params (in a type-safe way)
  searchParamsCache.parse(searchParams);

  return <UserDepositListingPage/>;
}
