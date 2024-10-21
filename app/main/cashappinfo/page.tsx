import { CashAppInfoPage } from '@/sections/cashappinfo/view';
import { SearchParams } from 'nuqs/parsers';

type pageProps = {
  searchParams: SearchParams;
};

export const metadata = {
  title: 'Main : Profile'
};

export default async function Page({ searchParams }: pageProps) {
  return <CashAppInfoPage />;
}
