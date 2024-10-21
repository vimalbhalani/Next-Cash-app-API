'use client';
import { PaymentDeposits } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

export const columns: ColumnDef<PaymentDeposits>[] = [
  {
    accessorKey: 'paymentoption',
    header: 'PAYMENT OPTION'
  },
  {
    accessorKey: 'paymenttype',
    header: 'TYPE'
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ row }) => `$${row.original.amount}` 
  },
  {
    accessorKey: 'paymentstatus',
    header: 'STATUS'
  }
];
