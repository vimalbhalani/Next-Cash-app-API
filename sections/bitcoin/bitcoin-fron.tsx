"use client";
import { Button } from '@/components/ui/button';
import { useState, useRef } from 'react';
import { useToast, toast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

export default function UserBitcoin() {
    const router = useRouter();
    const {dismiss} = useToast();
    const [bitcoinAddress] = useState("bc1q9fsmlxu6rgjatnt75qccj9v7kq7jjja38ca9p4"); // Example Bitcoin address
    const inputRef = useRef<HTMLInputElement>(null);

    const bitcoin = () => {
        router.push("/mypage/redeem");
    }

    const copyToClipboard = () => {
        if (inputRef.current) {
            inputRef.current.select();
            document.execCommand("copy");
            toast({
                title: "BTC Address Copied Successful!",
                description:"Welcome! Your bidcoin address have copied successfully.",
                action: <button onClick={dismiss}>BTC Address</button>,                
            })
        } else {
            toast({
                title: "BTC Address Copied Failed!",
                description:"Your bidcoin address have copied failed. Please try again!",
            })
        }
    }

    return (
        <div>
            <div className='grid justify-items-center'>
                <img src='/admin-btcaddress.png' className='border mt-20 self-auto' alt='Bitcoin Address'/>
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


