'use client';
import { AdminRegisterUsers, UserRegister } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';
import { LoginIdAction } from './login-id';
import { PasswordAction } from './password';

export const columns: ColumnDef<AdminRegisterUsers & UserRegister>[] = [
  {
    accessorKey: 'id',
    header: 'NO',
    cell: ({row}) => row.index + 1
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
    accessorKey: 'regitype',
    header: 'REGISTER TYPE'
  },
  {
    id:'actions',
    header: 'LOGIN ID',
    cell: ({ row }) => <LoginIdAction phoneNumber={row.original.phonenumber} loginIdV = {row.original.loginid} userName={row.original.user._id}/>
  },
  {
  id: 'actions',
  header: 'PASSWORD',
  cell: ({ row }) => <PasswordAction phoneNumber={row.original.phonenumber} passwordCodeV = {row.original.passwordcode} userName={row.original.user._id}/>
  },
];
