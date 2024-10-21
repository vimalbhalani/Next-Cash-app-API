'use client';
import { columns } from './columns';
import { useState, useEffect } from 'react';
import { PaymentDeposits } from '@/constants/data';
import NotificationTableView from './notification-table';

const userInfoStr = localStorage.getItem('userinfo');
const userInfo = userInfoStr ? JSON.parse(userInfoStr) : {};

export default function UserDepositTable() {

  const [data, setData] = useState<PaymentDeposits[]>([]);
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

        // Combine deposit and withdrawal data
        const combinedData = [
          ...(result.data[0].deposit || []), // Use empty array as a fallback
          ...(result.data[0].withdrawal || []) // Use empty array as a fallback
        ];
        
        setData(combinedData);
        setTotalData(result.totalCount); // Update this based on your expected total count

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

  return (
    <div className="space-y-4">
      <NotificationTableView columns={columns} data={data} totalItems={totalData} />
    </div>
  );
}
