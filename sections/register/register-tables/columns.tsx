'use client';
import { AdminRegisterUsers, UserRegister } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';
import { CodeAction } from './code-number';
import { CellAction } from './cell-action';

export const columns: ColumnDef<AdminRegisterUsers & UserRegister>[] = [
  {
    accessorKey: 'id',
    header: 'NO',
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: 'username',
    header: 'USERNAME',
    cell: ({ row }) => (
      <span>
        {row.original.user.firstname} {row.original.user.lastname}
      </span>
    ),
  },
  {
    accessorKey: 'phonenumber',
    header: 'PHONE NUMBER'
  },
  {
    accessorKey: 'ip',
    header: 'IP ADDRESS',
    cell: ({ row }) => (<span>{row.original.user.ip}</span>),
  },
  {
    accessorKey: 'category',
    header: 'CATEGORY'
  },
  {
    id: 'actions',
    header: 'CODE NUMBER',
    cell: ({ row }) => <CodeAction registerDate={row.original.date} codeNumber = {row.original.codenumber} regiStatus = {row.original.status} userName={row.original.user._id}/>
  },
  {
    id: 'actions',
    header:'ACTION',
    cell: ({ row }) => <CellAction deleteDate= {row.original.date} userId = {row.original.user._id} />
  }
];
