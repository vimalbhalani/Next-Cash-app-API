import { Breadcrumbs } from '@/components/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import UserDepositMiddle from '../deposit-fron';

const breadcrumbItems = [
  { title: 'Main', link: '/mypage' },
  { title: 'Deposit', link: '/mypage/deposit' },
  { title : 'Middle', link: '/mypage/deposit/middle'}
];

type TEmployeeListingPage = {};

export default async function UserDepositMiddlePage({}: TEmployeeListingPage) {

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
        <UserDepositMiddle/>
      </div>
    </PageContainer>
  );
}
