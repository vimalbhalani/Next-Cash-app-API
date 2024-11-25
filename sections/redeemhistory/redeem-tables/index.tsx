'use client';

import { columns } from './columns';
import { useState, useEffect, useTransition } from 'react';
import { Paymentredeems, AdminRegisterUsers } from '@/constants/data'; 
import AdminredeemHistoryTableView from './redeem-table';
import useSocket from '@/lib/socket';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';

export default function AdminredeemHistoryTable() {

  const {socket} = useSocket();
  const [data, setData] = useState<(Paymentredeems & AdminRegisterUsers)[]>([]);
  const [totalData, setTotalData] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchParam, setSearchParam] = useState("");
  const [selectCategory, setSelectCategory] = useState("tag");
  const [multiIds, setMultiIds] = useState<string[]>([]);
  const [load, startTransition] = useTransition();

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        const redeemsResponse = await fetch('/api/admin/getuser');
        const redeemsResult = await redeemsResponse.json();

        const usersResponse = await fetch('/api/admin/getuser');
        const usersResult = await usersResponse.json();
        const combinedData = redeemsResult.data.flatMap((redeemEntry: any) =>
          redeemEntry.redeem
            .filter((redeem: Paymentredeems) =>
              redeem.paymentstatus === 'complete' || redeem.paymentstatus === 'decline'
            )
            .map((redeem: Paymentredeems) => {
              const user = usersResult.data.find((user: AdminRegisterUsers) => user._id === redeem.id);
              return { ...redeem, user };
            })
        );

        const sortedData = combinedData.sort((a: any, b: any) => new Date(b.date) - new Date(a.date));

        setData(sortedData);
        setTotalData(redeemsResult.totalCount); 
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

  useEffect(() => {
    socket.on("selectHistoryMultiIds", (data: any) => {
      setMultiIds(data);
    })
  }, [])

  useEffect(() => {
    socket.on("selectHistoryMultiId", (data: any) => {
      if (!data.id && data.date) {
        setMultiIds((prevMultiIds) => prevMultiIds.filter(item => item.date !== data.date));
      } else {
        setMultiIds((prevMultiIds) => [...prevMultiIds, data]);
      }
    });
  }, []);

  
  const multiRestore = async () => {
    
    if (multiIds.length == 0) {
      toast({
        title: 'Restore Failed!',
        description: 'Please check item!',
      });
      return;
    }

    startTransition(async () => {      
      try {
        const response = await userMultiCheck({
          paymentstatus: "Processing",
          data: multiIds,
        });

        if (response.error) {
          return;
        }

        toast({
          title: 'Restore Successful!',
          description: 'You have restored successful!',
        });

        location.reload();

      } catch (error) {
        toast({
          title: 'Restore Failed!',
          description: 'Your action has been failed. Please try again!',
        });
      }
    });
  };

  const userMultiCheck = async (userData: { paymentstatus: string, data: any }) => {
    try {
      const response = await fetch('/api/admin/multiCheck', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return { error: errorData.message || 'redeem failed' };
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  };

  const multiDelete = async () => {

    if (multiIds.length == 0) {
      toast({
        title: 'Delete Failed!',
        description: 'Please check item!',
      });
      return;
    }
    
    startTransition(async () => {
      try {
        const response = await userDeleteMultiCheck({
          data: multiIds,
        });

        if (response.error) {
          return;
        }

        toast({
          title: 'Delete Successful!',
          description: 'You have deleted successful!',
        });

        location.reload();

      } catch (error) {
        toast({
          title: 'Delete Failed!',
          description: 'Your action has been failed. Please try again!',
        });
      }
    });
  };

  const userDeleteMultiCheck = async (userData: {data: any }) => {
    try {
      const response = await fetch('/api/admin/multiDelete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return { error: errorData.message || 'redeem failed' };
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Replace with a spinner or loading message if needed
  }

  return (
    <div className="space-y-4 ">
      <div className='flex justify-end'>
      <Button variant="outline" handleClick={multiRestore} className='mr-3 mt-3'>Multi Restore</Button>
      <Button variant="outline" handleClick={multiDelete} className='mr-3 mt-3'>Multi Delete</Button>
        <select
          onChange={(e) => setSelectCategory(e.target.value)}
          className='border focus:border-[#DAAC95] h-9 p-2 text-sm rounded-md outline-none mt-3 mr-3 bg-background'
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
      <AdminredeemHistoryTableView columns={columns} data={filteredData} totalItems={filteredData.length} />
    </div>
  );
}