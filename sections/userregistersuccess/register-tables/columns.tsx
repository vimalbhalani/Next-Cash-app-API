'use client';
import { AdminRegisterUsers } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<AdminRegisterUsers>[] = [
  {
    accessorKey: 'category',
    header: 'CATEGORY'
  },
  {
    accessorKey: 'loginid',
    header: 'LOGIN ID'
  },
  {
    accessorKey: 'passwordcode',
    header: 'PASSWORD'
  }
];
