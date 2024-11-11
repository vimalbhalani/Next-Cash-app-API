'use client';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { useToast, toast } from '@/components/ui/use-toast';

import useSocket from '@/lib/socket';

const {socket} = useSocket();


interface UserData {
  id: string;
  codenumber: string;
  phonenumber: string;
}

export const CodeAction = ({ phoneNumber, codeNumber, userName, regiStatus }: { phoneNumber: string; codeNumber?: string; userName: string; regiStatus: string }) => {
  
  const { dismiss } = useToast();
  const [codenum, setCodenum] = useState(codeNumber || ""); // Initialize with codeNumber if available

  const userData: UserData = {
    id: userName,
    codenumber: codenum,
    phonenumber: phoneNumber,
  }

  // Example signUp function
  const onSubmit = async (userData: UserData) => {

    if(codenum===""){
      toast({
        title: 'Code Number  empty!',
        description: 'Please input code number!',
      });
      return;
    }

    try {
      const response = await fetch('/api/admin/coderegister', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return { error: errorData.message || 'Code sending failed' }; // Handle response error
      }

      toast({
        title: 'Code Sending Successful!',
        description: 'Welcome! Your code sending has been successful.',
        action: <button onClick={dismiss}>Code Sending</button>,
      });
      
      socket.emit("adminRegister", {receiveuserId: userName, message:"Client sent codenumber to you!"} );

      location.reload();

      return await response.json(); // Assume successful response returns user data or a success message
    } catch (error) {
      toast({
        title: 'Code Sending Failed!',
        description: 'Your code sending has failed. Please try again.',
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

  // Set codenum whenever codeNumber prop changes
  useEffect(() => {
    if (codeNumber) {
      setCodenum(codeNumber);
    } else {
      setCodenum(""); // Reset if codeNumber is none or invalid
    }
  }, [codeNumber]);

  return (
    <div className='relation flex justify-center'>
      <input
        className=' w-48 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50'
        value={codenum} // Set input value to codenum
        onChange={(e) => setCodenum(e.target.value)}
        disabled={regiStatus !== "preparing" || codeNumber !== "none"}
        onInput={(e) => {
          e.target.value = e.target.value.replace(/[^0-9]/g, '');
        }}
      />
      <Button className='h-8 w-10 text-xs bg-white' onClick={handleButtonClick} disabled={regiStatus !== "preparing" || codeNumber !== "none"} >
        SEND
      </Button>
    </div>
  );
};
