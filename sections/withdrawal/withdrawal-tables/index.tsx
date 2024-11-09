'use client';
import { columns } from './columns';
import { useState, useEffect } from 'react';
import { PaymentWithdrawals, AdminRegisterUsers } from '@/constants/data'; // Make sure this path is correct
import AdminWithdrawalTableView from './withdrawal-table';

export default function AdminWithdrawalTable() {
  const [data, setData] = useState<(PaymentWithdrawals & AdminRegisterUsers)[]>([]);
  const [totalData, setTotalData] = useState<number>(0); // Store total items for pagination
  const [combinedDataCount, setCombinedDataCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        // Fetch Payment Withdrawals
        const withdrawalsResponse = await fetch('/api/admin/getuser'); // Your API for withdrawals
        const withdrawalsResult = await withdrawalsResponse.json();

        // Fetch Admin Registered Users
        const usersResponse = await fetch('/api/admin/getuser'); // Corrected API for users
        const usersResult = await usersResponse.json();

        // Filter withdrawals to only include those with paymentStatus "processing"
        const filteredWithdrawals = withdrawalsResult.data.flatMap((withdrawalEntry: any) =>
          withdrawalEntry.withdrawal.filter((withdrawal: PaymentWithdrawals) => withdrawal.paymentstatus === "processing")
        );

        // Combine datasets: Map the filtered withdrawals with user data
        const combinedData = filteredWithdrawals.map((withdrawal: PaymentWithdrawals) => {
          const user = usersResult.data.find((user: AdminRegisterUsers) => user._id === withdrawal.id);
          return { ...withdrawal, user };
        });

        // Set data and total counts, adjust based on your API response
        setData(combinedData);
        setCombinedDataCount(combinedData.length);
        setTotalData(filteredWithdrawals.length); // Count of filtered withdrawals
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
      <div className='text-red-500 font-semibold'>Pending Request Count: {combinedDataCount}</div>
      <AdminWithdrawalTableView columns={columns} data={data} totalItems={totalData} />
    </div>
  );
}
