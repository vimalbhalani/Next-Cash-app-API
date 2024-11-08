// UserRegistrationForm.client.js
"use client"; // Ensures this is recognized as a client component
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';


export default function UserredeemMiddle() {

    const router = useRouter();

    const cashapp = () => {
        router.push("/mypage/redeem/cashapp");
    }

    const bitcoin = () => {
        router.push("/mypage/redeem/bitcoin");
    }

    return (
        <div >
            <Button className='border p-6 ml-[25%] w-[55%] mt-11' handleClick={cashapp}>Directly redeem to admin cash app</Button>
            <Button className='border p-6 ml-[25%] w-[55%] mt-11' handleClick={bitcoin}>Bitcoin</Button>
        </div>
    );
}
