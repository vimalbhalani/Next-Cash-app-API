// UserRegistrationForm.client.js
"use client"; // Ensures this is recognized as a client component

import { useTransition } from 'react';
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
    paymentgateway: z.string()// Ensure it's a number
});

const userInfoStr = localStorage.getItem('userinfo')
const userInfo = userInfoStr ? JSON.parse(userInfoStr) : {};
type UserFormValue = z.infer<typeof formSchema>;

export default function UserWithdrawalMiddle() {

    const router = useRouter();
    const {dismiss} = useToast();
    const [loading, startTransition] = useTransition();
    const form = useForm<UserFormValue>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (data: UserFormValue) => {
        startTransition(async () => {
            const response = await signUp({
                paymentgateway: data.paymentgateway,
                token: userInfo.token,
            });

            console.log(response);
            if (response.error) {
                console.error('Signup error:', response.error);
                return;
            }

            toast({
                title: 'Withdrawal Request Successful!',
                description: 'Welcome! Your withdrawal has been request.',
                action: <button onClick={dismiss}>Withdrawal</button>,
            });

            router.push("/mypage/withdrawal");
        });
    };

    const signUp = async (userData: { paymentgateway: string, token: string; }) => {
        try {
            const response = await fetch('/api/customer/withdrawalrequest', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                return { error: errorData.message || 'Signup failed' };
            }

            return await response.json();
        } catch (error) {
            console.error('Error during fetch:', error);
            throw error;
        }
    };

    const withdrawalmiddle = () =>{

    }

    return (
        <div >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-2">
                    <div>
                        <FormField
                            control={form.control}
                            name="paymentgateway"
                            render={({ field }) => (
                                <FormItem className='w-[50%] mt-20 ml-[25%]'>
                                    <p className='py-10 text-center font-bold text-8 '>YOUR CASHTAG OR BTC ADDRESS </p>
                                    <FormControl>
                                        <Input disabled={loading} {...field}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button disabled={loading} className='p-6 ml-[25%] w-[50%] mt-32' handleClick={withdrawalmiddle}>
                        REQUEST
                    </Button>
                </form>
            </Form>
        </div>
    );
}
