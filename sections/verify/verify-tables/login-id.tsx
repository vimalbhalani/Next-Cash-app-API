'use client';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { useToast, toast } from '@/components/ui/use-toast';
import useSocket from '@/lib/socket';

interface UserData {
  id: string;
  loginid: string;
  phonenumber: string;
}

const {socket} = useSocket();

export const LoginIdAction = ({ phoneNumber, loginIdV, passwordCodeV, userName }: { phoneNumber: string; loginIdV?: string; passwordCodeV:string; userName: string; }) => {

  const { dismiss } = useToast();
  const [loginId, setLoginId] = useState(loginIdV|| "");
  const [passwordCode, setPasswordCode] = useState(passwordCodeV || "");

  const userData = {
    id: userName,
    phonenumber: phoneNumber,
    loginid: loginId,
    passwordcode: passwordCode,
    status: "preparing"
  }

  
  // Example signUp function
  const onSubmit = async (userData: UserData) => {

    if (loginId === ""){

      toast({
        title: 'LoginId empty!',
        description: 'Please input loginid!',
      });
      return;
    }

    if (loginId.length < 15 ){

      toast({
        title: 'LoginId!',
        description: 'Your login ID must be at least 15 characters long.',
      });
      return;
    }

    if(passwordCode === ""){

      toast({
        title: 'Passwordcode empty!',
        description: 'Please input passwordcode!',
      });
      return;
    }

    if (passwordCode.length < 15 ){

      toast({
        title: 'PasswordCode!',
        description: 'Your Password Code must be at least 15 characters long.',
      });
      return;
    }

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
        title: 'LoginID and PasswordCode Sending Successful!',
        description: 'Welcome! Your loginId and Password Code sending has been success.',
        action: <button onClick={dismiss}>LoginID And Password Code</button>,
      });

      socket.emit("adminLoginId", {receiveuserId: userName, message:"Client sent login id and password code to you!"} );

      location.reload();

      return await response.json(); // Assume successful response returns user data or a success message
    } catch (error) {
      console.error('Error during fetch:', error);
      toast({
        title: 'Sending Failed!',
        description: 'Your loginId and password code sending has been failed. Please try again.',
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
      setLoginId("");
    }

    if (passwordCodeV) {
      setPasswordCode(passwordCodeV);
    } else {
      setPasswordCode(""); 
    }

  }, [loginIdV, passwordCodeV]);

  return (
    <div className='flex w-full justify-center'>
      <input
        className=' w-48 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50'
        onChange={(e) => setLoginId(e.target.value)}
        value={loginId}
        disabled={loginIdV && loginIdV !== "none"}
      />

      <input
        className=' w-48 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50'
        onChange={(e) => setPasswordCode(e.target.value)}
        value={passwordCode}
        disabled={passwordCodeV && passwordCodeV !== "none"}
      />
      <Button className='h-8 w-10 ml-5 text-xs bg-white' handleClick={handleButtonClick} disabled={loginIdV &&loginIdV !== "none"}>
        SEND
      </Button>
    </div>
  );
};

