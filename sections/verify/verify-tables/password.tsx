'use client';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { useToast, toast } from '@/components/ui/use-toast'; 
import useSocket from '@/lib/socket';


interface UserData {
  passwordcode: string;
  phonenumber: string;
}

const {socket} = useSocket();

export const PasswordAction = ({phoneNumber, passwordCodeV, userName}:{phoneNumber: string, passwordCodeV:string, userName:string }) => {
  
  const {dismiss} = useToast();
  const [passwordCode, setPasswordCode] = useState(passwordCodeV || "");
  
  const userData = {
    passwordcode: passwordCode,
    phonenumber:phoneNumber,
  }

  // Example signUp function
  const onSubmit = async (userData: UserData) => {
    try {
      const response = await fetch('/api/admin/passwordcode', {
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
      
      toast({
        title: 'Password Sending Successful!',
        description: 'Welcome! Your password sending has been success.',
        action: <button onClick={dismiss}>Password Sending</button>,
      });

      socket.emit("adminPasswordCode", {receiveuserId: userName, message:"Client sent password code to you!"} )

      return await response.json(); // Assume successful response returns user data or a success message
    } catch (error) {
      console.error('Password Sending fetch:', error);
      toast({
        title: 'LoginID Sending Successful!',
        description: 'Your password sending has been success.',
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
    if (passwordCodeV) {
      setPasswordCode(passwordCodeV);
    } else {
      setPasswordCode(""); // Reset if passwordCodeV is none or invalid
    }
  }, [passwordCodeV]);

  return (
    <div className='flex w-full justify-center'>
      <input
        className=' w-20 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50'
        maxLength={6}
        value={passwordCode}
        onChange={(e) => setPasswordCode(e.target.value)}
        disabled={passwordCodeV && passwordCodeV !== "none"}
      />
      <Button className='h-8 w-10 ml-5 text-xs bg-white' handleClick={handleButtonClick} disabled={passwordCodeV && passwordCodeV !== "none"}>
        SEND
      </Button>
    </div>
  );
};

