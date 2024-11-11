'use client';
import { columns } from './columns';
import { useState, useEffect } from 'react';
import { PaymentWithdrawals } from '@/constants/data';
import UserPromotionTableView from './user-promtion-table';

const userInfoStr = localStorage.getItem('userinfo');
const userInfo = userInfoStr ? JSON.parse(userInfoStr) : {};

export default function UserPromotionTable() {

  const [data, setData] = useState<PaymentWithdrawals[]>([]);  
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
        setData(result.data[0].withdrawal); // Adjust based on your API response
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

  // Sort data by date in descending order and slice to get the first 5 latest records
  const latestData = data
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) // Sort by date
    .slice(0, 5); // Get the top 5 latest records

  return (
    <div className="space-y-4 ">
      <UserPromotionTableView columns={columns} data={latestData} totalItems={totalData} />
    </div>
  );
}
