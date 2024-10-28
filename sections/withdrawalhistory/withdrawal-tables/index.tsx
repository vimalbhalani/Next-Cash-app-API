'use client';
import { columns } from './columns';
import { useState, useEffect } from 'react';
import { PaymentWithdrawals, AdminRegisterUsers } from '@/constants/data'; // Make sure this path is correct
import AdminWithdrawalHistoryTableView from './withdrawal-table';

export default function AdminWithdrawalHistoryTable() {
  const [data, setData] = useState<(PaymentWithdrawals & AdminRegisterUsers)[]>([]);
  const [totalData, setTotalData] = useState<number>(0); // Store total items for pagination
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        // Fetch Payment Deposits
        const withdrawalsResponse = await fetch('/api/admin/getwithdrawal'); // Your API for deposits
        const withdrawalsResult = await withdrawalsResponse.json();
        // console.log(withdrawalResult);
        
        
        // Fetch Admin Register Users
        const usersResponse = await fetch('/api/admin/getwithdrawal'); // Your API for users
        const usersResult = await usersResponse.json();
        // console.log(usersResult);
        

        // Combine datasets: Assuming both datasets contain a common property to merge.
        const combinedData = withdrawalsResult.data.flatMap((withdrawalEntry:any) => 
          withdrawalEntry.withdrawal.map((withdrawal: PaymentWithdrawals) => {
            const user = usersResult.data.find((user: AdminRegisterUsers) => user._id === withdrawal.id);          
            return { ...withdrawal, user }; 
          })
        );
        // console.log(combinedData);
        
        // Set data and total counts, adjust based on your API response
        setData(combinedData);
        setTotalData(withdrawalsResult.totalCount); // Adjust if necessary
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

  return (
    <div className="space-y-4">
      <AdminWithdrawalHistoryTableView columns={columns} data={data} totalItems={totalData} />
    </div>
  );
}
