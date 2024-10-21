// UserRegistrationForm.client.js
"use client"; // Ensures this is recognized as a client component
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';


export default function UserDepositMiddle() {

    const router = useRouter();
    const directly = () => {

    }

    const cashapp = () => {
        router.push("/mypage/deposit/cashapp");
    }

    const bitcoin = () => {
        router.push("/mypage/deposit/bitcoin");
    }

    return (
        <div >
            <Button className='border p-6 ml-[25%] w-[55%] mt-11' handleClick={directly}>Directly deposit to admin cash app</Button>
            <Button className='border p-6 ml-[25%] w-[55%] mt-11' handleClick={cashapp}>Cashapp Open</Button>
            <Button className='border p-6 ml-[25%] w-[55%] mt-11' handleClick={bitcoin}>Bitcoin</Button>
        </div>
    );
}
