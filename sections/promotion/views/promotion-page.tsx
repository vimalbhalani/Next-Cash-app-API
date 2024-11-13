import { Breadcrumbs } from '@/components/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import PromotionPage from '../promotion-fron';
import UserPromotionTable from '../promotion-tables';
import { PromotionRule } from '../promotion-rule';

const breadcrumbItems = [
  { title: 'Main', link: '/mypage' },
];

type TEmployeeListingPage = {};

export default async function Promotion({}: TEmployeeListingPage) {

  return (
    <PageContainer scrollable>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading
            title={`Promotion`}
            description=""
          />
        </div>
        <Separator />
        <PromotionPage/>
        <p className='flex justify-center font-bold'>Player Redeem List</p>
        <UserPromotionTable/>
        <PromotionRule/>
      </div>
    </PageContainer>
  );
}
