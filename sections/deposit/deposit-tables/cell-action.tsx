'use client';
import { AlertModal } from '@/components/modal/alert-modal';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Employee } from '@/constants/data';
import { CheckCircle, MoreHorizontal, Send, Trash, X } from 'lucide-react';
import { useTransition } from 'react';
import { useToast, toast } from '@/components/ui/use-toast';

interface CellActionProps {
  data: Employee;
}

export const CellAction: React.FC<CellActionProps> = ({ depositDate, userId }: any) => {

  const { dismiss } = useToast();
  const [loading, startTransition] = useTransition();

  const deposit = async () => {
    startTransition(async () => {
      try {
        const response = await userDepositCheck({
          id: userId,
          paymentstatus: "complete",
          date: depositDate,
        });

        if (response.error) {
          return;
        }

        toast({
          title: 'Deposit Successful!',
          description: 'You have deposited successful!',
          action: <button onClick={dismiss}>Deposit</button>,
        });

        location.reload();

      } catch (error) {
        toast({
          title: 'Deposit Failed!',
          description: 'Your action has been failed. Please try again!',
        });
      }
    });
  };

  const userDepositCheck = async (userData: { paymentstatus: string, id: string; date: any }) => {
    try {
      const response = await fetch('/api/admin/deposit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return { error: errorData.message || 'Deposit failed' };
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  };

  const undeposit = async () => {
    startTransition(async () => {
      try {
        const response = await userUndepositCheck({
          id: userId,
          paymentstatus: "decline",
          date: depositDate,
        });

        if (response.error) {
          return;
        }

        toast({
          title: 'Decline Successful!',
          description: 'You have declined successful!',
          action: <button onClick={dismiss}>Decline</button>,
        });

        location.reload();

      } catch (error) {
        toast({
          title: 'Deposit Failed!',
          description: 'Your action has been failed. Please try again!',
        });
      }
    });
  };

  const userUndepositCheck = async (userData: { paymentstatus: string, id: string; date: any }) => {
    try {
      const response = await fetch('/api/admin/deposit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return { error: errorData.message || 'Deposit failed' };
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  };
  
  if (loading) {
    return <div>Loading...</div>; // Replace with a spinner or loading message if needed
  
  }
  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Action</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={deposit}
          >
            <CheckCircle className="mr-2 h-4 w-4" /> Accept
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={undeposit}
          >
            <X className="mr-2 h-4 w-4" /> Decline
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
