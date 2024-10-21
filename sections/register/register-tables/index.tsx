'use client';
import { AdminRegisterUsers } from '@/constants/data';
import { columns } from './columns';
import { useState, useEffect } from 'react';
import RegisterTablePage from './register-table';

export default function RegisterTable() {

  const [data, setData] = useState<AdminRegisterUsers[]>([]);
  const [totalData, setTotalData] = useState<number>(0); // Store total items for pagination
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch('/api/admin/getuser'); // Replace with your API endpoint
        const result = await response.json();
        setData(result.data); // Adjust based on your API response
        setTotalData(result.totalCount); // Adjust based on your API response
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
      <RegisterTablePage columns={columns} data={data} totalItems={totalData} />
    </div>
  );
}
