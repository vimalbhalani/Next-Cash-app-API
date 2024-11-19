'use client';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { toast } from '@/components/ui/use-toast';

interface UserData {
  id: string;
  amount: number;
  date: string;
}

export const AmountAction = ({ withdrawalDate, userId, withdrawalAmount }: { withdrawalDate: any; userId: string; withdrawalAmount: number }) => {
  
  const [amount, setAmount] = useState<number>(withdrawalAmount); // Initialize with codeNumber if available

  const userData: UserData = {
    id: userId,
    amount: amount,
    date: withdrawalDate,
  }

  // Example signUp function
  const onSubmit = async (userData: UserData) => {

    if(!amount){
      toast({
        title: 'Amount  empty!',
        description: 'Please input amount!',
      });
      return;
    }

    try {
      const response = await fetch('/api/admin/withdrawalamount', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return { error: errorData.message || 'Amount updating failed' }; // Handle response error
      }

      toast({
        title: 'Amount updating Successful!',
        description: 'Welcome! Amount updating has been successful.',
      });
      
      location.reload();

      return await response.json(); // Assume successful response returns user data or a success message
    } catch (error) {
      toast({
        title: 'Amount updating Failed!',
        description: 'Amount updating has failed. Please try again.',
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

  return (
    <div className='relation flex justify-center'>
      <input
        className=' w-16 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50'
        value={amount} // Set input value to codenum
        onChange={(e) => setAmount(e.target.value)}
        onInput={(e) => {
          e.target.value = e.target.value.replace(/[^0-9]/g, '');
        }}
      />
      <Button className='h-8 text-xs text-white px-1 bg-blue-500 ml-1' handleClick={handleButtonClick}>
        UPDATE
      </Button>
    </div>
  );
};
