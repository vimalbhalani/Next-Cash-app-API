'use client';
import { columns } from './columns';
import { useState, useEffect } from 'react';
import { AdminRegisterUsers, PaymentWithdrawals } from '@/constants/data';
import UserPromotionTableView from './user-promtion-table';

const userInfoStr = localStorage.getItem('userinfo');
const userInfo = userInfoStr ? JSON.parse(userInfoStr) : {};

export default function UserPromotionTable() {

  const [data, setData] = useState<(PaymentWithdrawals & AdminRegisterUsers)[]>([]);  
  const [totalData, setTotalData] = useState<number>(0); // Store total items for pagination
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      try {
        if (!userInfo.token) {
          throw new Error("User not authenticated.");
        }

        setLoading(true);
        
        const withdrawalsResponse = await fetch('/api/customer/getuserInfo', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userInfo.token}` // Assuming the token is sent this way
          }
        });

        if (!withdrawalsResponse.ok) {
          throw new Error('Network response was not ok');
        }

        const withdrawalsResult = await withdrawalsResponse.json();

        const usersResponse = await fetch('/api/customer/getuserInfo', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userInfo.token}` // Assuming the token is sent this way
          }
        });

        if (!usersResponse.ok) {
          throw new Error('Network response was not ok');
        }

        const usersResult = await usersResponse.json();

        const filteredWithdrawals = withdrawalsResult.data.flatMap((withdrawalEntry: any) =>
          withdrawalEntry.withdrawal.filter((withdrawal: PaymentWithdrawals) => withdrawal.paymentstatus === "complete")
        );

        const combinedData = filteredWithdrawals.map((withdrawal: PaymentWithdrawals) => {
          const user = usersResult.data.find((user: AdminRegisterUsers) => user._id === withdrawal.id);
          return { ...withdrawal, user };
        });

        setData(combinedData);
        setTotalData(filteredWithdrawals.length); 
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

    console.log(latestData);
    

  return (
    <div className="space-y-4 ">
      <UserPromotionTableView columns={columns} data={latestData} totalItems={totalData} />
    </div>
  );
}
