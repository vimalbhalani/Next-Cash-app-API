'use client';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useToast, toast } from '@/components/ui/use-toast';
import useSocket from '@/lib/socket';
import { useRouter } from 'next/navigation';
import GoogleSignInButton from './google-auth-button';

const {socket} = useSocket()

const formSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' })
});

type UserFormValue = z.infer<typeof formSchema>;

export default function UserAuthForm() {
  const router = useRouter();
  const {dismiss} = useToast();
  const [loading, startTransition] = useTransition();
  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: UserFormValue) => {
    startTransition(async () => {
      try {
        // Replace signIn with your signUp function or API call
        const response = await signIn({
          email: data.email,
          password: data.password,
        });

        if (response.error) {
          // Handle error (e.g. show error message)
          toast({
            title: 'SignIn Failed!',
            description: 'Your email or password is incorrect! Please try again.',
          });
          console.error('Signup error:', response.error);
          return;
        }

        //LocalStroge
        localStorage.setItem('userinfo', JSON.stringify(response.user));
        socket.emit("register", {userId:response.user.userId, role:response.user.role})

        toast({
          title: 'SignIn Successful!',
          description: 'Welcome! Your signin has been success.',
          action: <button onClick={dismiss}>SignIn</button>,
        });

        // Redirect user after successful signup
        if(response.user.role==="admin"){
         router.push("/main")
        }else{
          router.push("/mypage");
        }

      } catch (error) {
        // Handle errors that do not come from the response
        console.error('Signup error:', error);
        toast({
          title: 'SignIn Failed!',
          description: 'Your email or password is incorrect! Please try again.',
        });
      }
    });
  };

  // Example signUp function
  const signIn = async (userData: { email: string; password: string; }) => {
    try {
      const response = await fetch('/api/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast({
          title: 'SignIn Failed!',
          description: 'Your email or password is incorrect! Please try again.',
        });
        return { error: errorData.message || 'Signin failed' }; // Handle response error
      }

      return await response.json(); // Assume successful response returns user data or a success message
    } catch (error) {
      console.error('Error during fetch:', error);
      throw error; // Rethrow or return an error response
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-2"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    disabled={loading}
                    {...field}
                  />
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
                  <Input
                    type='password'
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={loading} className="ml-auto w-full" type="submit">
            LOG IN
          </Button>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <GoogleSignInButton />
    </>
  );
}
