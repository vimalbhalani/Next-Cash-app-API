"use client";
import { Button } from '@/components/ui/button';
import { useState, useRef, useEffect } from 'react';
import { useToast, toast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

export default function UserZelle() {
    const router = useRouter();
    const {dismiss} = useToast();
    const [data, setData] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const zelle = () => {
        router.push("/mypage/deposit");
    }

    const copyToClipboard = () => {
        if (inputRef.current) {
            inputRef.current.select();
            document.execCommand("copy");
            toast({
                title: "Zelle Copied Successful!",
                description:"Welcome! Zelle have copied successfully.",
                action: <button onClick={dismiss}>Zelle</button>,                
            })
        } else {
            toast({
                title: "Zelle Copied Failed!",
                description:"Zelle have copied failed. Please try again!",
            })
        }
    }

    useEffect(() => {
        async function fetchData() {
          try {
            const response = await fetch('/api/admin/getadmin');
            const result = await response.json();
            setData(result.data[0].zelle);
          } catch (error) {
            console.error('Error fetching data:', error);
          } finally {
          }
        }
    
        fetchData();
      }, []);

    return (
        <div>
            <div className='flex items-center justify-center mt-32'>
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
            <Button className='border p-6 ml-[30%] w-[40%] mt-28' handleClick={zelle}>OK</Button>
        </div>
    );
}


