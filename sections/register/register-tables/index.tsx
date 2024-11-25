'use client';

import { AdminRegisterUsers, UserRegister } from '@/constants/data';
import { columns } from './columns';
import { useState, useEffect, useTransition } from 'react';
import RegisterTablePage from './register-table';
import { Button } from '@/components/ui/button';
import useSocket from '@/lib/socket';
import { toast } from '@/components/ui/use-toast';

export default function RegisterTable() {

  const {socket} = useSocket();
  const [data, setData] = useState<AdminRegisterUsers[]>([]);
  const [totalData, setTotalData] = useState<number>(0); // Store total items for pagination
  const [loading, setLoading] = useState<boolean>(true);
  const [multiIds, setMultiIds] = useState<string[]>([]);
  const [load, startTransition] = useTransition();

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
  
        const registerResponse = await fetch('/api/admin/getregister');
        const registerResult = await registerResponse.json();
  
        const usersResponse = await fetch('/api/admin/getregister'); 
        const usersResult = await usersResponse.json();
  
        const combinedData = registerResult.data.flatMap((registerEntry: any) =>
          registerEntry.register.map((register: UserRegister) => {
            const user = usersResult.data.find((user: AdminRegisterUsers) => user._id === register.id);
            return { ...register, user };
          })
        );
  
        const sortedData = combinedData.sort((a: any, b: any) => new Date(b.date) - new Date(a.date));
  
        setData(sortedData);
        setTotalData(registerResult.totalCount);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }
  
    fetchData();
  }, []);
  

  useEffect(() => {
    socket.on("selectRegisterMultiIds", (data: any) => {
      setMultiIds(data);
    })
  }, [])

  useEffect(() => {
    socket.on("selectRegisterMultiId", (data: any) => {
      if (!data.id && data.date) {
        setMultiIds((prevMultiIds) => prevMultiIds.filter(item => item.date !== data.date));
      } else {
        setMultiIds((prevMultiIds) => [...prevMultiIds, data]);
      }
    });
  }, []);

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

  const userDeleteMultiCheck = async (userData: { data: any }) => {
    try {
      const response = await fetch('/api/admin/multiRegisterDelete', {
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
        <Button variant="outline" handleClick={multiDelete} className='mr-3 mt-3'>Multi Delete</Button>
      </div>
      <RegisterTablePage columns={columns} data={data} totalItems={data.length} />
    </div>
  );
}
