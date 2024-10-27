'use client';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { useToast, toast } from '@/components/ui/use-toast';
import useSocket from '@/lib/socket';

interface UserData {
  phonenumber: string;
  codenumber: string;
}

const {socket} = useSocket();
const userInfoStr = localStorage.getItem('userinfo');
const userInfo = userInfoStr ? JSON.parse(userInfoStr) : {};

export const CodeAction = ({ codeNumber, statusNow, phoneNumber }:{codeNumber: string, statusNow: string, phoneNumber: string}) => {
  
  const [codenum, setCodenum] = useState("");
  const {dismiss} = useToast();
  
  const userData = {
    token: userInfo.token,
    phonenumber: phoneNumber,
    codenumber: codenum,
    status: "complete",
  }

  // Example signUp function
  const onSubmit = async (userData: UserData) => {
    try {
      const response = await fetch('/api/customer/coderegister', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return { error: errorData.message || 'UserRegister failed' }; // Handle response error
      }

      socket.emit("userVerify", {userId: userInfo.userId, message:`${userInfo.name} requested login id and password code!`})

      return await response.json(); // Assume successful response returns user data or a success message
    } catch (error) {
      throw error; // Rethrow or return an error response
    }
  };

  // Function to handle button click
  const onVerify = async () => {
    const response = await onSubmit(userData);
    // Handle the response or error here
    if (response && response.error) {
      toast({
        title: 'Codenumber Verify Failed',
        description: 'Please try again.'
      });
    } else {
      toast({
        title: 'Codenumber Verify Successful',
        description: 'Welcome! Your codenumber has been verified.',
        action: <button onClick={dismiss}>CodeNumber Verify</button>,
      });
    }
  };

  // Set codenum whenever codeNumber prop or statusNow changes
  useEffect(() => {
    if (statusNow === "complete" && codeNumber) {
      setCodenum(codeNumber); // Set codenum to codeNumber if status is complete
    } else {
      setCodenum(""); // Reset if status is not "complete" or codeNumber is invalid
    }
  }, [codeNumber, statusNow]);
  
  return (
    <div className='flex w-full justify-center'>
      <input
        value={codenum} // Set the input value to codenum
        className='w-20 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50'
        maxLength={6}
        onChange={(e) => setCodenum(e.target.value)}
        disabled={statusNow === "complete"} // Disable the input field if status is "complete" 
      />
      <Button 
        className='h-8 w-12 ml-1 text-xs bg-white' 
        handleClick={onVerify} 
        disabled={codeNumber === "none" || statusNow === "complete"} // Disable button if codeNumber is "none" or status is "complete"
      >
        Verify
      </Button>
    </div>
  );
};
