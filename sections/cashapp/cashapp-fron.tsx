"use client";
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';


export default function UserCashApp() {

    const router = useRouter();
    const [data, setData] = useState('');

    useEffect(() => {
        async function fetchData() {
          try {
            const response = await fetch('/api/admin/getadmin'); // Replace with your API endpoint
            const result = await response.json();
            console.log(result);
            
            setData(result.data[0].cashtag); // Adjust based on your API response
          } catch (error) {
            console.error('Error fetching data:', error);
          } finally {
          }
        }
    
        fetchData();
      }, []);

      const cashapp = () => {
        window.location.href = `https://cash.app/qr/${data}`;
      }

      const back = () => {
        router.push("/mypage/deposit");
      }

    return (
        <div>
            <div className='grid justify-items-center' >
                <div className='flex items-center text-center w-52 h-52 mt-20 self-auto '>If you click "QR Code", you can get admin's QR code.</div>
            </div>
            <Button className='border p-6 ml-[30%] w-[40%] mt-11' handleClick={cashapp}>QR Code</Button>
            <Button className='border p-6 ml-[30%] w-[40%] mt-11' handleClick={back}>OK</Button>
        </div>
    );
}