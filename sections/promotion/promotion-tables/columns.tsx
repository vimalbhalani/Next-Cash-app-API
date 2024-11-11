'use client';
import { PaymentWithdrawals } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

export const columns: ColumnDef<PaymentWithdrawals>[] = [
  {
    accessorKey: 'paymentoption',
    header: 'Game'
  },
  {
    accessorKey: 'paymenttype',
    header: 'Tag Number'
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({row}) => `$${row.original.amount}`
  },
];
