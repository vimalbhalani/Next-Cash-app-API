import { Breadcrumbs } from '@/components/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import RegisterSuccessTable from '../register-tables';

const breadcrumbItems = [
  { title: 'MyPage', link: '/mypage' },
  { title: 'Register', link: '/mypage/register' },
  { title: 'Success', link: '/mypage/register/registersuccess' }
];

type TEmployeeListingPage = {};

export default async function UserRegisterSuccessListingPage({}: TEmployeeListingPage) {

  return (
    <PageContainer scrollable>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading
            title={`Register`}
            description=""
          />
        </div>
        <Separator />
        <p className='py-5 text-2xl font-bold text-center'>THANK YOU</p>
        <RegisterSuccessTable />
      </div>
    </PageContainer>
  );
}
