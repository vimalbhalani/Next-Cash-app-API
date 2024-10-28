'use client';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useToast, toast } from '@/components/ui/use-toast';

// Extend schema to include password confirmation
const formSchema = z.object({
  ID: z.string(),
  password: z.string()
})

const userInfoStr = localStorage.getItem('userinfo')
const userInfo = userInfoStr ? JSON.parse(userInfoStr) : {};

type UserFormValue = z.infer<typeof formSchema>;

export default function MyPageViewPageView() {

  const { dismiss } = useToast();
  const [loading, startTransition] = useTransition();
  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
  });

  const [selectedOption, setSelectedOption] = useState("A");

  const onSubmit = async (data: UserFormValue) => {
    startTransition(async () => {
      try {
        // Replace signIn with your signUp function or API call
        const response = await userUpdate({
          regitype: selectedOption,
          loginid: data.ID,
          passwordcode: data.password,
          token: userInfo.token,
        });

        if (response.error) {
          // Handle error (e.g. show error message)
          console.error('Userupdate error:', response.error);
          return;
        }

        toast({
          title: 'User update Successful',
          description: 'Welcome! Your update has been request.',
          action: <button onClick={dismiss}>Update</button>,
        });

      } catch (error) {
        // Handle errors that do not come from the response
        console.error('Userupdate error:', error);
        toast({
          title: 'User update failed',
          description: 'Sorry! Your update has been failed.',
        });
      }
    });
  };

  // Example signUp function
  const userUpdate = async (userData: { regitype: string; loginid: string; passwordcode: string; token: string }) => {
    try {
      const response = await fetch('/api/customer/userupdate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return { error: errorData.message || 'Userupdate failed' }; // Handle response error
      }

      return await response.json(); // Assume successful response returns user data or a success message
    } catch (error) {
      console.error('Error during fetch:', error);
      throw error; // Rethrow or return an error response
    }
  };

  return (
    <div className='h-screen'>
      <h1 className='text-3xl font-bold'>My Page</h1>
      <hr className='mt-5' />
      <h2 className='p-2 text-center font-semibold text-2xl mt-5'>Login Info</h2>
      <div className='px-10'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-2">
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
            <div className='grid grid-cols-2 gap-10 mt-11'>
              <FormField
                control={form.control}
                name="ID"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>LOGIN ID</FormLabel>
                    <FormControl>
                      <Input type="text" disabled={loading} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" disabled={loading} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button disabled={loading} className="ml-auto w-full mt-[320px]" type="submit">
              Setting Personal Information
            </Button>
          </form>
        </Form>
      </div>
      <div className='mt-52'>
      </div>
    </div>
  );
}
