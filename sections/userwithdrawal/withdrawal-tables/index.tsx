'use client';
import { columns } from './columns';
import { useState, useEffect } from 'react';
import { PaymentWithdrawals } from '@/constants/data';
import UserWithdrawalTableView from './user-withdrawal-table';

const userInfoStr = localStorage.getItem('userinfo');
const userInfo = userInfoStr ? JSON.parse(userInfoStr) : {};

export default function UserWithdrawalTable() {

  const [data, setData] = useState<PaymentWithdrawals[]>([]);  
  const [totalData, setTotalData] = useState<number>(0); // Store total items for pagination
  const [loading, setLoading] = useState<boolean>(true);
  const [category, setCategory] = useState<string>("");

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
        setData(result.data[0].withdrawal);
        setCategory(result.data[0].register[0].status)
        setTotalData(result.totalCount);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [userInfo]);
  
  if (category !== "complete") {
    return<div className='text-xl text-center font-bold text-red-500'>First at all, You must register!</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4 ">
      <UserWithdrawalTableView columns={columns} data={data} totalItems={data.length} />
    </div>
  );
}
