"use client";
import { Button } from '@/components/ui/button';
import { useState, useRef } from 'react';
import { toast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function UserBitcoin() {
    const router = useRouter();
    const [bitcoinAddress] = useState("bc1q9fsmlxu6rgjatnt75qccj9v7kq7jjja38ca9p4"); // Example Bitcoin address
    const inputRef = useRef<HTMLInputElement>(null);

    const bitcoin = () => {
        router.push("/mypage/deposit");
    }

    const copyToClipboard = () => {
        if (inputRef.current) {
            inputRef.current.select();
            document.execCommand("copy");
            toast({
                title: "BTC Address Copied Successful!",
                description:"Welcome! Bidcoin address have copied successfully.",
            })
        } else {
            toast({
                title: "BTC Address Copied Failed!",
                description:"Bidcoin address have copied failed. Please try again!",
            })
        }
    }

    return (
        <div>
            <div className='grid justify-items-center'>
                <Image src='/admin-btcaddress.png' width={200} height={200} className='border mt-20 self-auto' alt='Bitcoin Address'/>
            </div>
            <div className='flex items-center justify-center mt-5'>
                <input
                    type='text'
                    value={bitcoinAddress}
                    readOnly
                    className='border p-2 w-1/2 text-center outline-none rounded-md'
                    ref={inputRef}
                />
                <Button className='border py-5' handleClick={copyToClipboard}>
                    Copy
                </Button>
            </div>
            <Button className='border p-6 ml-[30%] w-[40%] mt-32' handleClick={bitcoin}>OK</Button>
        </div>
    );
}


