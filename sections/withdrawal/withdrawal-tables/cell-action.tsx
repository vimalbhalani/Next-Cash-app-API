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
import { MoreHorizontal, Send, Trash } from 'lucide-react';
import { useState, useTransition} from 'react';
import { useToast, toast } from '@/components/ui/use-toast';

interface CellActionProps {
  data: Employee;
}

export const CellAction: React.FC<CellActionProps> = ({ phoneNumber, Amount}:{phoneNumber: string, Amount: number}) => {

  const {dismiss} = useToast();
  const [loading, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  const withdrawal = async () => {
    startTransition(async () => {
        try {
            const response = await userWithdrawalCheck({
                paymentstatus:"complete",
                phonenumber: phoneNumber,
                amount: Amount,
            });

            console.log(response);
            if (response.error) {
                console.error('Withdrawal error:', response.error);
                return;
            }

            toast({
                title: 'Withdrawal Verify Successful!',
                description: 'You have verified customer deposit',
                action: <button onClick={dismiss}>Deposit</button>,
              });

        } catch (error) {
            toast({
                title: 'Withdrawal Failed!',
                description: 'Your action has been failed. Please try again!',
              });
        }
    });
};

const userWithdrawalCheck = async (userData: { paymentstatus: string, phonenumber: string; amount: string }) => {
    try {
        const response = await fetch('/api/admin/withdrawal', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            return { error: errorData.message || 'Withdrawal failed' };
        }

        return await response.json();
    } catch (error) {
        console.error('Error during fetch:', error);
        throw error;
    }
};

  const onConfirm = async () => {};

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
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
            onClick={withdrawal}
          >
            <Send className="mr-2 h-4 w-4" /> Send
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
