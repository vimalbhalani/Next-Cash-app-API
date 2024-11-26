'use client';
import { columns } from './columns';
import { useState, useEffect } from 'react';
import { Paymentredeems, UserRegister } from '@/constants/data';
import UserredeemTableView from './user-redeem-table';

const userInfoStr = localStorage.getItem('userinfo');
const userInfo = userInfoStr ? JSON.parse(userInfoStr) : {};

export default function UserredeemTable() {

  const [data, setData] = useState<Paymentredeems[]>([]);
  const [totalData, setTotalData] = useState<number>(0); // Store total items for pagination
  const [loading, setLoading] = useState<boolean>(true);
  const [category, setCategory] = useState<string>("");

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
            'Authorization': `Bearer ${userInfo.token}`
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();

        const sortedData = result.data[0].redeem.sort((a: any, b: any) => new Date(b.date) - new Date(a.date));

        setData(sortedData); 
        setCategory(result.data[0].register[0].status);
        setTotalData(result.totalCount); 

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [userInfo]);
  
  if(category !== "complete"){
    return<div className='text-xl text-center font-bold text-red-500'>First at all, You must register!</div>;
  }
  
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4 ">
      <UserredeemTableView columns={columns} data={data} totalItems={data.length} />
    </div>
  );
}
