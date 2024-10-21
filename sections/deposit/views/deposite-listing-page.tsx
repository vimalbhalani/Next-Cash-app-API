import { Breadcrumbs } from '@/components/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import AdminDepositTable from '../deposit-tables';

const breadcrumbItems = [
  { title: 'Main', link: '/main' },
  { title: 'Deposit', link: '/main/deposit' }
];

type TEmployeeListingPage = {};

export default async function DepositListingPage({}: TEmployeeListingPage) {
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
        <AdminDepositTable />
      </div>
    </PageContainer>
  );
}
