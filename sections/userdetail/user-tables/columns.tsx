'use client';
import { AdminRegisterUsers, UserRegister } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

export const columns: ColumnDef<AdminRegisterUsers & UserRegister>[] = [
  {
    accessorKey: 'category',
    header: 'GAME',
    cell:({row})=>(<span>{row.original.register[0].category}</span>)
  },
  {
    accessorKey: 'loginid',
    header: 'User ID',
    cell:({row})=>(<span>{row.original.register[0].loginid}</span>)
  },
  {
    accessorKey: 'passwordcode',
    header: 'Password',
    cell:({row})=>(<span>{row.original.register[0].passwordcode}</span>)
  },
  {
    id: 'actions',
    header:'ACTION',
    cell: ({ row }) => <CellAction phoneNumber= {row.original.phonenumber} userId = {row.original._id} />
  }
];
