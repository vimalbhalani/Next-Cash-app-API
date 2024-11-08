'use client';

import { useEffect, useState } from 'react';
import { GameLink } from './game-link';
import { UserRegister } from '@/constants/data';
import { useRouter } from 'next/navigation';

const userInfoStr = localStorage.getItem('userinfo');
const userInfo = userInfoStr ? JSON.parse(userInfoStr) : {};

export default function MyPageViewPageView() {
  const [data, setData] = useState<UserRegister[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        if (!userInfo.token) {
          throw new Error("User not authenticated.");
        }

        setLoading(true);

        const response = await fetch('/api/customer/getregisuccess', {
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
        setData(result.data[0].register);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Replace with a spinner or loading message if needed
  }

  // Determine if loginid and passwordcode exist
  const hasCredentials = data[0]?.loginid && data[0]?.passwordcode;

  const request = () =>{
    router.push("/mypage/register");
  }

  return (
    <div className='w-full h-screen'>
      <h1 className='text-3xl font-bold'>My Page</h1>
      <hr className='mt-5' />
      <h2 className='p-2 text-center font-semibold text-2xl mt-5'>Login Info</h2>
      <div className='mt-24'>
        <div className='flex justify-center'>
          <p className='w-[150px] font-bold text-base'>Your Category:</p>
          <p className='w-[150px]'>{data[0]?.category || 'N/A'}</p>
        </div>
        <div className='flex justify-center mt-5'>
          <p className='w-[150px] font-bold text-base'>Login Id:</p>
          <p className='w-[150px]'>{data[0]?.loginid || 'N/A'}</p>
        </div>
        <div className='flex justify-center mt-5'>
          <p className='w-[150px] font-bold text-base'>Password Code:</p>
          <p className='w-[150px]'>{data[0]?.passwordcode || 'N/A'}</p>
        </div>
      </div>

      {/* Conditionally render button if loginid and passwordcode are missing */}
      {!hasCredentials && (
        <div className="flex justify-center mt-10">
          <button
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-gray-500"
            onClick={request}
          >
            Request Credentials
          </button>
        </div>
      )}

      <div className='mt-52'>
        <GameLink />
      </div>
    </div>
  );
}
