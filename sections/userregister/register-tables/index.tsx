'use client';
import { AdminRegisterUsers } from '@/constants/data';
import { columns } from './columns';
import { useState, useEffect } from 'react';
import UserRegisterTableView from './user-register-table';
import UserRegistrationForm from './user-register-fron';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { GameLink } from './game-link';

const userInfoStr = localStorage.getItem('userinfo');
const userInfo = userInfoStr ? JSON.parse(userInfoStr) : {};

export default function UserRegisterTable() {
  const router = useRouter();
  const [data, setData] = useState<AdminRegisterUsers[]>([]);
  const [totalData, setTotalData] = useState<number>(0); // Store total items for pagination
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      try {
        if (!userInfo.token) {
          throw new Error("User not authenticated.");
        }

        setLoading(true);

        const response = await fetch('/api/customer/getuserInfo', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userInfo.token}` // Assuming the token is sent this way
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        setData(result.data[0].register); // Adjust based on your API response
        setTotalData(result.totalCount); // Adjust based on your API response
        
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [userInfo]);

  if (loading) {
    return <div>Loading...</div>; // Replace with a spinner or loading message if needed
  }

  const requestSuccess = () => {
    router.push("/mypage/promotion");
  }

  return (
    <div className="space-y-4 ">
      <UserRegistrationForm />
      <Button
        className='border p-6 ml-[20%] w-[60%] text-white'
        handleClick={requestSuccess}
      >
        Check Your Register Info
      </Button>
      <p className='py-5 text-medium font-bold text-center'>Register History</p>
      <UserRegisterTableView columns={columns} data={data} totalItems={data.length} />
      <GameLink />
    </div>
  );
}
