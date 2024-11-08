import { Breadcrumbs } from '@/components/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import PromotionPage from '../promotion-fron';

const breadcrumbItems = [
  { title: 'MyPage', link: '/mypage' },
  { title: 'Promotion', link: '/mypage/promotion' },
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
      </div>
    </PageContainer>
  );
}
