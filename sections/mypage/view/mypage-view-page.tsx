import { Metadata } from 'next';
import MyPageViewPageView from '../mypage-create-form';

export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Authentication forms built using the components.'
};

export default function MyPageViewPage() {
  return (
    <div className="px-10">
          <MyPageViewPageView />
    </div>
  );
}
