'use client';
import { Checkbox } from '@/components/ui/checkboxdaily';
import { AdminRegisterUsers, Employee } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';
import { CodeAction } from './code-number';

export const columns: ColumnDef<AdminRegisterUsers>[] = [
  {
    accessorKey: 'regitype',
    header: 'REGISTER TYPE'
  },
  {
    accessorKey: 'phonenumber',
    header: 'PHONE NUMBER'
  },
  {
    accessorKey: 'status',
    header: 'STATUS'
  },
  {
    id: 'actions',
    header: 'CODE NUMBER',
    cell: ({row}) => <CodeAction codeNumber = {row.original.codenumber} statusNow = {row.original.status}/>
  }
];
