'use client';
import { AdminRegisterUsers, UserRegister } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

export const columns: ColumnDef<AdminRegisterUsers & UserRegister>[] = [
  {
    accessorKey: 'id',
    header: 'TAG NUMBER',
    cell: ({ row }) => (<span>{row.original.user.tag}</span>),
  },
  {
    accessorKey: 'name',
    header: 'NAME',
    cell: ({ row }) => (
      <span>
        {row.original.user.firstname} {row.original.user.lastname}
      </span>
    ),
  },
  {
    accessorKey: 'username',
    header: 'USERNAME',
    cell: ({ row }) => (<span>{row.original.user.email}</span>),
  },
  {
    accessorKey: 'ip',
    header: 'IP ADDRESS',
    cell: ({ row }) => (<span>{row.original.user.ip}</span>),
  },
  {
    accessorKey: 'phonenumber',
    header: 'PHONE NUMBER'
  },
  {
    id: 'actions',
    header:'ACTION',
    cell: ({ row }) => <CellAction phoneNumber= {row.original.phonenumber} userId = {row.original.user._id} />
  }
];
