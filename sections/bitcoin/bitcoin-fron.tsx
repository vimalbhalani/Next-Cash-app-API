"use client";
import { Button } from '@/components/ui/button';
import { useState, useRef, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { QRCodeSVG } from 'qrcode.react';

export default function UserBitcoin() {
    const router = useRouter();
    const [bitcoinAddress] = useState("bc1q9fsmlxu6rgjatnt75qccj9v7kq7jjja38ca9p4"); // Example Bitcoin address
    const inputRef = useRef<HTMLInputElement>(null);
    const [data, setData] = useState("");

    const bitcoin = () => {
        router.push("/mypage/deposit");
    }

    const copyToClipboard = () => {
        if (inputRef.current) {
            inputRef.current.select();
            document.execCommand("copy");
            toast({
                title: "BTC Address Copied Successful!",
                description: "Welcome! Bidcoin address have copied successfully.",
            })
        } else {
            toast({
                title: "BTC Address Copied Failed!",
                description: "Bidcoin address have copied failed. Please try again!",
            })
        }
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('/api/admin/getadmin');
                const result = await response.json();
                setData(result.data[0].bitcoin);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
            }
        }

        fetchData();
    }, []);

    return (
        <div>
            <div className='flex justify-center mt-20'>
                {data !== "none" ?
                    <div className='border p-2'>
                        <QRCodeSVG value={data} size={180} level={"H"}/>
                    </div> : ""
                }
            </div>
            <div className='flex items-center justify-center mt-10'>
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


