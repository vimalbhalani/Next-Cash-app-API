'use client';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { useToast, toast } from '@/components/ui/use-toast';
import useSocket from '@/lib/socket';

interface UserData {
  loginid: string;
  phonenumber: string;
}

const {socket} = useSocket();

export const LoginIdAction = ({ phoneNumber, loginIdV, userName }: { phoneNumber: string; loginIdV?: string; userName: string; }) => {

  const { dismiss } = useToast();
  const [loginId, setLoginId] = useState(loginIdV || "");

  const userData = {
    loginid: loginId,
    status: "process",
    phonenumber: phoneNumber,
  }

  // Example signUp function
  const onSubmit = async (userData: UserData) => {
    try {
      const response = await fetch('/api/admin/loginid', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      console.log(userData);
      if (!response.ok) {
        const errorData = await response.json();
        return { error: errorData.message || 'loginid sending failed' }; // Handle response error
      }

      toast({
        title: 'LoginID Sending Successful!',
        description: 'Welcome! Your loginId sending has been success.',
        action: <button onClick={dismiss}>LoginID Sending</button>,
      });

      socket.emit("adminLoginId", {receiveuserId: userName, message:"Client sent login id to you!"} )

      return await response.json(); // Assume successful response returns user data or a success message
    } catch (error) {
      console.error('Error during fetch:', error);
      toast({
        title: 'LoginID Sending Failed!',
        description: 'Your loginId sending has been failed. Please try again.',
      });
      throw error; // Rethrow or return an error response
    }
  };

  // Function to handle button click
  const handleButtonClick = async () => {
    const response = await onSubmit(userData);
    // Handle the response or error here
    if (response && response.error) {
      console.error(response.error);
    } else {
      console.log("Success:", response);
    }
  };

  useEffect(() => {
    if (loginIdV) {
      setLoginId(loginIdV);
    } else {
      setLoginId(""); // Reset if loginIdV is none or invalid
    }
  }, [loginIdV]);

  return (
    <div className='flex w-full justify-center'>
      <input
        className=' w-20 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50'
        maxLength={6}
        onChange={(e) => setLoginId(e.target.value)}
        value={loginId}
        disabled={loginIdV && loginIdV !== "none"}
      />
      <Button className='h-8 w-10 ml-5 text-xs bg-white' handleClick={handleButtonClick} disabled={loginIdV &&loginIdV !== "none"}>
        SEND
      </Button>
    </div>
  );
};

