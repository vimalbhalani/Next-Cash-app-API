// UserRegistrationForm.client.js
"use client"; // Ensures this is recognized as a client component
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';


export default function UserredeemMiddle() {

    const router = useRouter();

    const cashapp = () => {
        router.push("/mypage/deposit/cashapp");
    }

    const bitcoin = () => {
        router.push("/mypage/deposit/bitcoin");
    }

    const venmo = () => {
        router.push("/mypage/deposit/venmo");
    }

    const paypal = () => {
        router.push("/mypage/deposit/paypal");
    }

    const zelle = () => {
        router.push("/mypage/deposit/zelle");
    }

    return (
        <div >
            <Button className='border p-6 ml-[25%] w-[55%] mt-11' handleClick={cashapp}>Cash App</Button>
            <Button className='border p-6 ml-[25%] w-[55%] mt-11' handleClick={bitcoin}>Bitcoin</Button>
            <Button className='border p-6 ml-[25%] w-[55%] mt-11' handleClick={venmo}>Venmo</Button>
            <Button className='border p-6 ml-[25%] w-[55%] mt-11' handleClick={paypal}>Paypal</Button>
            <Button className='border p-6 ml-[25%] w-[55%] mt-11' handleClick={zelle}>Zelle</Button>
        </div>
    );
}
