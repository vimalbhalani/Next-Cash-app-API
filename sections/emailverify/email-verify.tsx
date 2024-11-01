'use client'

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const verifyEmail = localStorage.getItem('verifyemail');
const userEmail = verifyEmail ? JSON.parse(verifyEmail) : {};

export default function EmailVerifySendPage() {

    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const verifyCode = async () => {
        setLoading(true);
        setMessage('');
        
        // Generate a 6-digit random code
        const code = Math.floor(100000 + Math.random() * 900000);
        
        try {
            // 1. Send request to /api/sendemail to send the verification email
            let response = await fetch('/api/sendemail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: userEmail, code }),
            });

            let data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to send email.');
            }

            // 2. Send request to /api/emailcode to store the verification code in the database
            response = await fetch('/api/emailcode', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: userEmail, code }),
            });

            data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to save code in database.');
            }

            setMessage('Verification email sent and code saved successfully!');
            router.push("/emailcodeverify");
        } catch (err: any) {
            setMessage(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex w-full h-[100vh] justify-center items-center '>
            <div className="border border-2 w-[350px] h-52 p-8 md:w-1/3">
                <h1 className="text-2xl font-semibold tracking-tight text-center">
                    Email Verification
                </h1>
                <h3 className='text-center mt-5'>
                    Click the button below to verify your email.
                </h3>
                <div className='flex w-full justify-center mt-5'>
                    <Button 
                        variant="default" 
                        handleClick={verifyCode} 
                        disabled={loading}
                        className='w-96 text-white'>
                        {loading ? 'Sending...' : 'Send Email Verify'}
                    </Button>
                </div>
                {message && <p className="text-center mt-3 text-red-600">{message}</p>}
            </div>
        </div>
    );
}
