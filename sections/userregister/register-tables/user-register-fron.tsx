"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast, toast } from '@/components/ui/use-toast';
import useSocket from '@/lib/socket';
import { useRouter } from 'next/navigation';

const { socket } = useSocket();

// Extend schema to include password confirmation
const formSchema = z.object({
  phonenumber: z.string(),
});

const userInfoStr = localStorage.getItem('userinfo')
const userInfo = userInfoStr ? JSON.parse(userInfoStr) : {};

type UserFormValue = z.infer<typeof formSchema>;

export default function UserRegistrationForm() {

  const router = useRouter();
  const { dismiss } = useToast();
  const [loading, startTransition] = useTransition();
  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
  });

  const [selectedOption, setSelectedOption] = useState('A');

  const onSubmit = async (data: UserFormValue) => {

    startTransition(async () => {
      try {
        // Replace signIn with your signUp function or API call
        const response = await userRegister({
          regitype: selectedOption,
          phonenumber: data.phonenumber,
          token: userInfo.token,
          status: "processing"
        });

        console.log(response, "response");

        if (response.error) {
          // Handle error (e.g. show error message)
          console.error('UserRegister error:', response.error);
          return;
        }

        toast({
          title: 'Register Successful',
          description: 'Welcome! Your register has been request.',
          action: <button onClick={dismiss}>Register</button>,
        });

        socket.emit("userRegister", { userId: userInfo.userId, message: `${userInfo.name} requested codenumber!` })

      } catch (error) {
        // Handle errors that do not come from the response
        toast({
          title: 'Register Failed',
          description: 'There was an error register your account. Please try again.',
        });
      }
    });
  };

  // Example signUp function
  const userRegister = async (userData: { regitype: string; phonenumber: string; token: string; status: string }) => {
    try {
      const response = await fetch('/api/customer/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      console.log(userData);
      if (!response.ok) {
        const errorData = await response.json();
        return { error: errorData.message || 'UserRegister failed' }; // Handle response error
      }

      return await response.json(); // Assume successful response returns user data or a success message
    } catch (error) {
      console.error('Error during fetch:', error);
      throw error; // Rethrow or return an error response
    }
  };

  const requestSuccess = () => {
    router.push("/mypage/register/registersuccess");
  }

  return (
    <div >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-2">
          <div className='grid grid-cols-3 gap-5'>
            <div className='flex flex-col'>
              <label className='text-sm font-medium'>Regi type</label>
              <select
                id="A"
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
                className='border focus:border-[#DAAC95] h-9 p-2 text-sm rounded-md outline-none mt-3 bg-background'
              >
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">E</option>
              </select>
            </div>
            <FormField
              control={form.control}
              name="phonenumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input type='text' disabled={loading} {...field}
                      onInput={(e) => {
                        e.target.value = e.target.value.replace(/[^0-9]/g, '');
                      }} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={loading} className="ml-auto w-full mt-8">
              Send Code
            </Button>
          </div>
        </form>
      </Form>
      <Button className='border p-6 ml-[30%] w-[40%] mt-11' handleClick={requestSuccess}>Register Successful</Button>
    </div>
  );
}
