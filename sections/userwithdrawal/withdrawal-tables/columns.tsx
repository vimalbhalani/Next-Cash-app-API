'use client';
import { PaymentWithdrawals } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

export const columns: ColumnDef<PaymentWithdrawals>[] = [
  {
    accessorKey: 'paymentoption',
    header: 'WITHDRAW OPTION'
  },
  {
    accessorKey: 'paymenttype',
    header: 'TYPE'
  },
  {
    accessorKey: 'amount',
    header: 'AMOUNT',
    cell: ({row}) => `$${row.original.amount}`
  },
  {
    accessorKey: 'tip',
    header: 'TIP'
  },
  {
    accessorKey: 'paymentstatus',
    header: 'STATUS'
  }
];
