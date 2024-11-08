'use client';
import { UserRegister} from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';
import { CodeAction } from './code-number';

export const columns: ColumnDef<UserRegister>[] = [
  {
    accessorKey: 'category',
    header: 'CATEGORY'
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
    cell: ({row}) => <CodeAction codeNumber = {row.original.codenumber} statusNow = {row.original.status} phoneNumber = {row.original.phonenumber}/>
  }
];
