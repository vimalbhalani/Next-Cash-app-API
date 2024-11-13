'use client';
import { columns } from './columns';
import { useState, useEffect } from 'react';
import { Paymentredeems, AdminRegisterUsers } from '@/constants/data'; // Make sure this path is correct
import AdminRedeemTableView from './redeem-table';

export default function AdminRedeemTable() {
  const [data, setData] = useState<(Paymentredeems & AdminRegisterUsers)[]>([]);
  const [totalData, setTotalData] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
  
        // Fetch Payment redeems
        const redeemsResponse = await fetch('/api/admin/getuser'); // Your API for redeems
        const redeemsResult = await redeemsResponse.json();
        
        // Fetch Admin Register Users
        const usersResponse = await fetch('/api/admin/getuser'); // Your API for users
        const usersResult = await usersResponse.json();
        
        const combinedData = redeemsResult.data.flatMap((redeemEntry: any) => 
          redeemEntry.redeem
            .filter((redeem: Paymentredeems) => redeem.paymentstatus === "Processing") // Filter for processing status
            .map((redeem: Paymentredeems) => {
              const user = usersResult.data.find((user: AdminRegisterUsers) => user._id === redeem.id);
              return { ...redeem, user }; 
            })
        );

        // Set data, total counts, and combined data count
        setData(combinedData);
        setTotalData(redeemsResult.totalCount); // Adjust if necessary
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
      <AdminRedeemTableView columns={columns} data={data} totalItems={totalData} />
    </div>
  );
}
