import { Breadcrumbs } from '@/components/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import NotificationTable from '../notification-tables';

const breadcrumbItems = [
  { title: 'MyPage', link: '/mpage' },
  { title: 'Notification', link: '/mypage/notification' }
];

type TEmployeeListingPage = {};

export default async function NotificationListingPage({}: TEmployeeListingPage) {

  return (
    <PageContainer scrollable>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading
            title={`Notification`}
            description=""
          />
        </div>
        <Separator />
        <NotificationTable />
      </div>
    </PageContainer>
  );
}
