"use client";
import Image from 'next/image';
import { GameLink } from './game-link';

export default function PromotionPage() {

    return (
        <>
            <div className='grid justify-items-center' >
                <Image src="/WEB-POSTER.png" width={1000} height={1000} alt='ad' />
            </div>
            <GameLink/>
        </>
    );
}