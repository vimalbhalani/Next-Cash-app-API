"use client";
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import { QRCodeSVG } from 'qrcode.react';


export default function UserCashApp() {

  const router = useRouter();
  const [data, setData] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const cashAppUrl = `cash.app/qr/${data}`;

  const copyToClipboard = () => {
    if (inputRef.current) {
      inputRef.current.select();
      document.execCommand("copy");
      toast({
        title: "Cashtag Copied Successful!",
        description: "Welcome! Cashtag have copied successfully.",
      })
    } else {
      toast({
        title: "Cashtag Copied Failed!",
        description: "Cashtag have copied failed. Please try again!",
      })
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/admin/getadmin'); // Replace with your API endpoint
        const result = await response.json();
        setData(result.data[0].cashtag); // Adjust based on your API response
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
      }
    }

    fetchData();
  }, []);

  const back = () => {
    router.push("/mypage/deposit");
  }

  return (
    <div>
      <div className='flex justify-center mt-20'>
        {data !== "none" ?
          <div className='border p-2'>
            <QRCodeSVG value={cashAppUrl} size={180} level={"H"} />
          </div> : ""
        }
      </div>
      <div className='flex items-center justify-center mt-10'>
        <input
          type='text'
          value={data}
          readOnly
          className='border p-2 w-1/2 text-center outline-none rounded-md'
          ref={inputRef}
        />
        <Button className='border py-5' handleClick={copyToClipboard}>
          Copy
        </Button>
      </div>
      <Button className='border p-6 ml-[30%] w-[40%] mt-11' handleClick={back}>OK</Button>
    </div>
  );
}