"use client";

import { useState, useTransition, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast, toast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

// Extend schema to include password confirmation
const formSchema = z.object({
    amount: z.string()// Ensure it's a number
});

const userInfoStr = localStorage.getItem('userinfo')
const userInfo = userInfoStr ? JSON.parse(userInfoStr) : {};

type UserFormValue = z.infer<typeof formSchema>;

const COOLDOWN_KEY = 'cooldown_data';

export default function UserredeemForm() {

    const router = useRouter();
    const { dismiss } = useToast();
    const [loading, startTransition] = useTransition();
    const form = useForm<UserFormValue>({
        resolver: zodResolver(formSchema),
    });

    const [selectedPayment, setSelectedPayment] = useState('Bank Transfer');
    const [selectedredeem, setSelectedredeem] = useState('CashApp');
    const [cooldown, setCooldown] = useState(false);
    const [remainingTime, setRemainingTime] = useState(30);

    useEffect(() => {
        const cooldownData = localStorage.getItem(COOLDOWN_KEY);
        if (cooldownData) {
            const { cooldown: savedCooldown, remainingTime: savedRemainingTime } = JSON.parse(cooldownData);
            setCooldown(savedCooldown);
            setRemainingTime(savedRemainingTime);
        }
    }, []);

    useEffect(() => {
        if (cooldown) {
            const intervalId = setInterval(() => {
                setRemainingTime(prev => {
                    if (prev <= 1) {
                        clearInterval(intervalId);
                        setCooldown(false);
                        localStorage.removeItem(COOLDOWN_KEY); // Clean up when cooldown ends
                        return 30;
                    }
                    return prev - 1;
                });
            }, 1000);

            // Save cooldown state to localStorage
            localStorage.setItem(COOLDOWN_KEY, JSON.stringify({ cooldown, remainingTime }));

            return () => {
                clearInterval(intervalId);
            };
        } else {
            // Remove cooldown data from localStorage when not in cooldown
            localStorage.removeItem(COOLDOWN_KEY);
        }
    }, [cooldown, remainingTime]);

    const onSubmit = async (data: UserFormValue) => {
        startTransition(async () => {
            try {
                const response = await userredeem({
                    paymentoption: selectedPayment,
                    paymenttype: selectedredeem,
                    amount: data.amount,
                    token: userInfo.token,
                    id: userInfo.userId
                });

                console.log(response);
                if (response.error) {
                    console.error('redeem error:', response.error);
                    return;
                }

                toast({
                    title: 'redeem Successful!',
                    description: 'Welcome! Your redeem has been request.',
                    action: <button onClick={dismiss}>redeem</button>,
                });

                setCooldown(true);
                localStorage.setItem(COOLDOWN_KEY, JSON.stringify({ cooldown: true, remainingTime: 59 }));

                setTimeout(() => {
                    setCooldown(false);
                    localStorage.removeItem(COOLDOWN_KEY);
                }, 30000);

            } catch (error) {
                toast({
                    title: 'redeem Failed!',
                    description: 'Your request has been failed. Please try again!',
                });
            }
        });
    };

    const userredeem = async (userData: { paymentoption: string; paymenttype: string; amount: number; token: string; }) => {
        try {
            const response = await fetch('/api/redeem', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                return { error: errorData.message || 'redeem failed' };
            }

            router.push("/mypage/redeem/redeemmiddle");

            return await response.json();
        } catch (error) {
            console.error('Error during fetch:', error);
            throw error;
        }
    };

    return (
        <div >
            <p className='text-center'>When depositing, please make sure to enter your 'Tag Number' in the 'Note.'
            If you do not enter the correct information, the balance will not load. (ex. $H0000)</p>
            <br />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-2">
                    <div>
                        <div className='flex justify-center'>
                            <label className='text-sm font-medium w-28 mt-4'>Category</label>
                            <select
                                id='FireKirin'
                                value={selectedPayment}
                                onChange={(e) => setSelectedPayment(e.target.value)}
                                className='border focus:border-[#DAAC95] h-9 p-2 text-sm rounded-md outline-none mt-3 bg-background w-[150px]'
                            >
                                <option value="FireKirin">FireKirin</option>
                                <option value="MilkyWay">MilkyWay</option>
                                <option value="OrionStars">OrionStars</option>
                                <option value="Juwa">Juwa</option>
                                <option value="GameVault">GameVault</option>
                                <option value="VegasSweep">VegasSweep</option>
                                <option value="YOLO">YOLO</option>
                                <option value="UltraPanda">UltraPanda</option>
                                <option value="VBlink">VBlink</option>
                            </select>
                        </div>
                        <div className='flex justify-center'>
                            <label className='text-sm font-medium w-28 mt-4'>Redeem Type</label>
                            <select
                                id='CashApp'
                                value={selectedredeem}
                                onChange={(e) => setSelectedredeem(e.target.value)}
                                className='border focus:border-[#DAAC95] h-9 p-2 text-sm rounded-md outline-none mt-3 bg-background w-[150px]'
                            >
                                <option value="CashApp">CashApp</option>
                                <option value="Bitcoin">Bitcoin</option>
                            </select>
                        </div>
                        <FormField
                            control={form.control}
                            name="amount"
                            render={({ field }) => (
                                <FormItem className='flex justify-center'>
                                    <FormLabel className='w-28 mt-4'>Amount</FormLabel>
                                    <FormControl>
                                        <Input
                                            className='w-[150px]'
                                            disabled={loading || cooldown}
                                            {...field}
                                            onInput={(e) => {
                                                e.target.value = e.target.value.replace(/[^0-9]/g, '');
                                            }} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button disabled={loading || cooldown} className='p-6 ml-[30%] w-[40%] mt-11' type='submit'>
                        {cooldown ? `Waiting (${remainingTime}s)` : "REQUEST"}
                    </Button>
                </form>
            </Form>
        </div>
    );
}
