'use client';
import { columns } from './columns';
import { useState, useEffect } from 'react';
import { PaymentDeposits, AdminRegisterUsers } from '@/constants/data'; // Make sure this path is correct
import AdminDepositHistoryTableView from './deposite-table';

export default function AdminDepositHistoryTable() {
  const [data, setData] = useState<(PaymentDeposits & AdminRegisterUsers)[]>([]);
  const [totalData, setTotalData] = useState<number>(0); // Store total items for pagination
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
  
        // Fetch Payment Deposits
        const depositsResponse = await fetch('/api/admin/getuser'); // Your API for deposits
        const depositsResult = await depositsResponse.json();
        // Fetch Admin Register Users
        const usersResponse = await fetch('/api/admin/getuser'); // Your API for users
        const usersResult = await usersResponse.json();
        const combinedData = depositsResult.data.flatMap((depositEntry: any) => 
          depositEntry.deposit
            .filter((deposit: PaymentDeposits) => 
              deposit.paymentstatus === 'complete' || deposit.paymentstatus === 'decline'
            )
            .map((deposit: PaymentDeposits) => {
              const user = usersResult.data.find((user: AdminRegisterUsers) => user._id === deposit.id);          
              return { ...deposit, user }; 
            })
        );
  
        // Set data and total counts, adjust based on your API response
        setData(combinedData);
        setTotalData(depositsResult.totalCount); // Adjust if necessary
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
    <div className="space-y-4 ">
      <AdminDepositHistoryTableView columns={columns} data={data} totalItems={totalData} />
    </div>
  );
}