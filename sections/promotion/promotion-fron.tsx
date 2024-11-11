"use client";
import Image from 'next/image';
import { GameLink } from './game-link';
import { useRouter } from 'next/navigation';

export default function PromotionPage() {

    const router = useRouter();

    const register = () => {
        router.push("/mypage/register");
    }

    const recharge = () => {
        router.push("/mypage/deposit");
    }

    const redeem = () => {
        router.push("/mypage/withdrawal");
    }

    const facebook = () => {
        router.push("https://www.facebook.com/profile.php?id=61564819906157&mibextid=ZbWKwL");
    }

    const instagram = () => {
        router.push("https://www.instagram.com/islandhouse2000/");
    }
    return (
        <>
        <div className='w-full'>
            <p className='text-center text-sm font-bold'>Welcome to ISLAND HOUSE!</p>
            <p className='text-center text-sm font-bold'>Click image to download link</p>
        </div>
            <GameLink/>
            <div className='grid justify-items-center' >
                <Image src="/WEB-POSTER.png" width={1000} height={1000} alt='ad' />
            </div>
            <div className='w-full grid grid-cols-1 place-items-center'>
                <div className='lg:flex lg:justify-center justify-items-center' >
                <Image src="/001.jpg" width={300} height={5}  className='hover:opacity-80 hover:cursor-pointer' onClick={register} alt='register'></Image>
                <Image src="/002.jpg" width={300} height={5}  className='lg:ml-2 lg:mt-0 mt-1 hover:opacity-80 hover:cursor-pointer' onClick={recharge} alt='recharge'></Image>
                <Image src="/003.jpg" width={300} height={5}  className='lg:ml-2 lg:mt-0 mt-1 hover:opacity-80 hover:cursor-pointer' onClick={redeem} alt='redeem'></Image>
                </div>
                <div className='mt-3 flex lg:justify-center justify-evenly'>
                <Image src="/facebook.png"  width={50} height={50} className='hover:opacity-80 hover:cursor-pointer' onClick={facebook} alt='facebook'></Image>
                <Image src="/instagram.png" width={50} height={50} className='ml-5 hover:opacity-80 hover:cursor-pointer' onClick={instagram} alt='instagram'></Image>
                </div>
            </div>
        </>
    );
}