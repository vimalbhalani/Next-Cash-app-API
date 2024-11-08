'use client';
import { Paymentredeems } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

export const columns: ColumnDef<Paymentredeems>[] = [
  {
    accessorKey: 'paymentoption',
    header: 'CATEGORY'
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
