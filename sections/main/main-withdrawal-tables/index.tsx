'use client';
import { columns } from './columns';
import { useState, useEffect } from 'react';
import { AdminRegisterUsers, PaymentWithdrawals } from '@/constants/data'; // Make sure this path is correct
import AdminMainWithdrawalTableView from './main-withdrawal-table';

export default function AdminMainTablePage() {
  const [data, setData] = useState<(PaymentWithdrawals & AdminRegisterUsers)[]>([]);
  const [totalData, setTotalData] = useState<number>(0); // Store total items for pagination
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        // Fetch Payment redeems
        const response = await fetch('/api/admin/totalwithdrawal'); // Your API for redeems
        const result = await response.json();

        console.log(result);

        // Transform the result using map
        const transformedData = result.data.map((item: any) => ({
          // Assuming each item has properties that resemble Paymentredeems and AdminRegisterUsers
          ...item, // Spread existing data
          // Add any additional transformations needed
        }));

        // Set data and total counts, adjust based on your API response
        setData(transformedData);
        setTotalData(result.totalCount); // Adjust if necessary
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

  if (loading) {
    return <div>Loading...</div>; // Replace with a spinner or loading message if needed
  }

  return (
    <div className="space-y-4 ">
      <AdminMainWithdrawalTableView columns={columns} data={data} totalItems={data.length} />
    </div>
  );
}

