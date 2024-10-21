"use client";

import { useState, useTransition } from 'react';
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

export default function UserDepositForm() {

    const router = useRouter();
    const {dismiss} = useToast();
    const [loading, startTransition] = useTransition();
    const form = useForm<UserFormValue>({
        resolver: zodResolver(formSchema),
    });

    const [selectedPayment, setSelectedPayment] = useState('Bank Transfer');
    const [selectedDeposit, setSelectedDeposit] = useState('CashApp');

    const onSubmit = async (data: UserFormValue) => {
        startTransition(async () => {
            try {
                const response = await userDeposit({
                    paymentoption: selectedPayment,
                    paymenttype: selectedDeposit,
                    amount: data.amount,
                    token: userInfo.token,
                    id: userInfo.userId
                });

                console.log(response);
                if (response.error) {
                    console.error('Deposit error:', response.error);
                    return;
                }

                toast({
                    title: 'Deposit Successful!',
                    description: 'Welcome! Your deposit has been request.',
                    action: <button onClick={dismiss}>Deposit</button>,
                  });

            } catch (error) {
                toast({
                    title: 'Deposit Failed!',
                    description: 'Your request has been failed. Please try again!',
                  });
            }
        });
    };

    const userDeposit = async (userData: { paymentoption: string; paymenttype: string; amount: number; token: string; }) => {
        try {
            const response = await fetch('/api/deposit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                return { error: errorData.message || 'Deposit failed' };
            }

            router.push("/mypage/deposit/depositmiddle");

            return await response.json();
        } catch (error) {
            console.error('Error during fetch:', error);
            throw error;
        }
    };

    return (
        <div >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-2">
                    <div>
                        <div className='flex justify-center'>
                            <label className='text-sm font-medium w-28 mt-4'>Payment Option</label>
                            <select
                                id='Bank Transfer'
                                value={selectedPayment}
                                onChange={(e) => setSelectedPayment(e.target.value)}
                                className='border focus:border-[#DAAC95] h-9 p-2 text-sm rounded-md outline-none mt-3 bg-background w-[150px]'
                            >
                                <option value="Bank Transfer">Bank Transfer</option>
                                <option value="Credit or Debit Card">Credit or Debit Card</option>
                                <option value="Digital Wallets">Digital Wallets</option>
                                <option value="Cryptocurrency">Cryptocurrency</option>
                                <option value="eChecks">eChecks</option>
                            </select>
                        </div>
                        <div className='flex justify-center'>
                            <label className='text-sm font-medium w-28 mt-4'>Deposit Type</label>
                            <select
                                id='CashApp'
                                value={selectedDeposit}
                                onChange={(e) => setSelectedDeposit(e.target.value)}
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
                                            disabled={loading}
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
                <Button disabled={loading} className='p-6 ml-[30%] w-[40%] mt-11' type='submit'>
                    Request
                </Button>
                </form>
            </Form>
        </div>
    );
}
