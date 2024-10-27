'use client';
import { AdminRegisterUsers, UserRegister } from '@/constants/data';
import { columns } from './columns';
import { useState, useEffect } from 'react';
import VerifyTablePage from './verify-table';

export default function VerifyTable() {

  const [data, setData] = useState<AdminRegisterUsers[]>([]);
  const [totalData, setTotalData] = useState<number>(0); // Store total items for pagination
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        // Fetch Payment Deposits
        const registerResponse = await fetch('/api/admin/getuserverify'); // Your API for deposits
        const registerResult = await registerResponse.json();
        
        // Fetch Admin Register Users
        const usersResponse = await fetch('/api/admin/getuserverify'); // Your API for users
        const usersResult = await usersResponse.json();
        
        const combinedData = registerResult.data.flatMap((completeRegsiterEntry:any) => 
          completeRegsiterEntry.completeRegisters.map((register: UserRegister) => {
            const user = usersResult.data.find((user: AdminRegisterUsers) => user._id === register.id);          
            return { ...register, user }; 
          })
        );
        console.log(combinedData);
        
        // Set data and total counts, adjust based on your API response
        setData(combinedData);
        setTotalData(registerResult.totalCount); // Adjust if necessary
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
      <VerifyTablePage columns={columns} data={data} totalItems={totalData} />
    </div>
  );
}
