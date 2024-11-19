'use client';
import { columns } from './columns';
import { useState, useEffect } from 'react';
import { PaymentWithdrawals, AdminRegisterUsers } from '@/constants/data'; // Make sure this path is correct
import AdminWithdrawalHistoryTableView from './withdrawal-table';

export default function AdminWithdrawalHistoryTable() {
  const [data, setData] = useState<(PaymentWithdrawals & AdminRegisterUsers)[]>([]);
  const [totalData, setTotalData] = useState<number>(0); // Store total items for pagination
  const [loading, setLoading] = useState<boolean>(true);
  const [searchParam, setSearchParam] = useState("");
  const [selectCategory, setSelectCategory] = useState("tag");

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
  
        // Fetch Payment redeems
        const withdrawalsResponse = await fetch('/api/admin/getuser'); // Your API for redeems
        const withdrawalsResult = await withdrawalsResponse.json();
        
        // Fetch Admin Register Users
        const usersResponse = await fetch('/api/admin/getuser'); // Your API for users
        const usersResult = await usersResponse.json();
        
        // Combine datasets and filter withdrawals by paymentStatus
        const combinedData = withdrawalsResult.data.flatMap((withdrawalEntry:any) => 
          withdrawalEntry.withdrawal
            .filter((withdrawal: PaymentWithdrawals) => 
              ['complete', 'decline'].includes(withdrawal.paymentstatus) // Filter by payment status
            )
            .map((withdrawal: PaymentWithdrawals) => {
              const user = usersResult.data.find((user: AdminRegisterUsers) => user._id === withdrawal.id);
              return { ...withdrawal, user }; 
            })
        );
        
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
  
  const filteredData = data.filter(item => {
    const param = searchParam.toLowerCase();
    switch (selectCategory) {
      case 'tag':
        return item.user?.tag?.toString().includes(param);
      case 'firstname':
        return item.user?.firstname?.toLowerCase().includes(param);
      case 'email':
        return item.user?.email?.toLowerCase().includes(param);
      case 'paymentoption':
        return item.paymentoption?.toLowerCase().includes(param);
      case 'paymenttype':
        return item.paymenttype?.toLowerCase().includes(param);
      default:
        return true;
    }
  });

  if (loading) {
    return <div>Loading...</div>; // Replace with a spinner or loading message if needed
  }

  return (
    <div className="space-y-4">
            <div className='flex justify-end'>
        <select
          onChange={(e) => setSelectCategory(e.target.value)}
          className='border focus:border-[#DAAC95] h-9 p-2 text-sm rounded-md outline-none mt-3 bg-background'
        >
          <option value="tag">Tag Number</option>
          <option value="firstname">Name</option>
          <option value="email">Username</option>
          <option value="paymentoption">Game</option>
          <option value="paymenttype">Type</option>
        </select>
        <input
          className='border focus:border-[#DAAC95] h-9 p-2 text-sm rounded-md outline-none mt-3 bg-background'
          placeholder='Search...'
          onChange={(e) => setSearchParam(e.target.value)}
        />
      </div>
      <AdminWithdrawalHistoryTableView columns={columns} data={filteredData} totalItems={filteredData.length} />
    </div>
  );
}
