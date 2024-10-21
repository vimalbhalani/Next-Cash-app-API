import { Breadcrumbs } from '@/components/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import UserDepositForm from '../user-deposit-tables/user-deposit-fron';
import UserDepositTable from '../user-deposit-tables';

const breadcrumbItems = [
  { title: 'Mypage', link: '/mypage' },
  { title: 'Deposit', link: '/mypage/deposit' }
];

type TEmployeeListingPage = {};

export default async function UserDepositListingPage({}: TEmployeeListingPage) {
  // Showcasing the use of search params cache in nested RSCs

  return (
    <PageContainer scrollable>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading
            title={`Deposit`}
            description=""
          />
        </div>
        <Separator />
        <UserDepositForm />
        <p className='py-5 text-medium font-bold text-center'>Deposit History</p>
        <UserDepositTable />
      </div>
    </PageContainer>
  );
}
