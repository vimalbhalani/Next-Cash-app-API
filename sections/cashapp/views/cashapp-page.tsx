import { Breadcrumbs } from '@/components/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import UserCashApp from '../cashapp-fron';

const breadcrumbItems = [
  { title: 'MyPage', link: '/mypage' },
  { title: 'redeem', link: '/mypage/redeem' },
  { title : 'CashApp', link: '/mypage/redeem/cashapp'}
];

type TEmployeeListingPage = {};

export default async function UserCashAppPage({}: TEmployeeListingPage) {

  return (
    <PageContainer scrollable>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading
            title={`redeem`}
            description=""
          />
        </div>
        <Separator />
        <UserCashApp/>
      </div>
    </PageContainer>
  );
}
