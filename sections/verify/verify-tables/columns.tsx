'use client';
import { AdminRegisterUsers } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';
import { LoginIdAction } from './login-id';
import { PasswordAction } from './password';

export const columns: ColumnDef<AdminRegisterUsers>[] = [
  {
    accessorKey: 'id',
    header: 'NO',
    cell: ({row}) => row.index + 1
  },
  {
    accessorKey: 'phonenumber',
    header: 'PHONE NUMBER'
  },
  {
    accessorKey: 'regitype',
    header: 'REGISTER TYPE'
  },
  {
    accessorKey: 'codenumber',
    header: 'CODE'
  },
  {
    id:'actions',
    header: 'LOGIN ID',
    cell: ({ row }) => <LoginIdAction phoneNumber={row.original.phonenumber} loginIdV = {row.original.loginid} userName={row.original._id}/>
  },
  {
  id: 'actions',
  header: 'PASSWORD',
  cell: ({ row }) => <PasswordAction phoneNumber={row.original.phonenumber} passwordCodeV = {row.original.passwordcode} userName={row.original._id}/>
  },
];
