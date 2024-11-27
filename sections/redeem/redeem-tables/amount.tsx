'use client';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import Image from 'next/image';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface UserData {
  id: string;
  amount: number;
  date: string;
}

export const AmountAction = ({ redeemDate, userId, redeemAmount, bitcoin }: { redeemDate: any; userId: string; redeemAmount: number, bitcoin: string }) => {

  const [amount, setAmount] = useState<number>(redeemAmount);

  const userData: UserData = {
    id: userId,
    amount: amount,
    date: redeemDate,
  }

  const onSubmit = async (userData: UserData) => {

    if (!amount) {
      toast({
        title: 'Amount  empty!',
        description: 'Please input amount!',
      });
      return;
    }

    try {
      const response = await fetch('/api/admin/redeemamount', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return { error: errorData.message || 'Amount updating failed' };
      }

      toast({
        title: 'Amount updating Successful!',
        description: 'Welcome! Amount updating has been successful.',
      });

      location.reload();

      return await response.json();
    } catch (error) {
      toast({
        title: 'Amount updating Failed!',
        description: 'Amount updating has failed. Please try again.',
      });
      throw error;
    }
  };

  const handleButtonClick = async () => {
    const response = await onSubmit(userData);

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
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        onInput={(e) => {
          e.target.value = e.target.value.replace(/[^0-9]/g, '');
        }}
      />
      <Button className='h-8 text-xs text-white px-1 bg-blue-500 ml-1' handleClick={handleButtonClick}>
        UPDATE
      </Button>

      <div className="relative flex flex-col items-center group">
        <Image src="/bitcoin.png" width={30} height={18} alt='bitcoin' className='ml-1' />
        <div className="absolute bottom-3 flex flex-col items-center hidden mb-5 group-hover:flex">
          <span className="relative rounded-md z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black shadow-lg">{bitcoin}</span>
        </div>
      </div>

    </div>
  );
};
