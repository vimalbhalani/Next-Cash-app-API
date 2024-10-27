import { NavItem } from '@/types';

const userInfoStr = localStorage.getItem('userinfo')
const userInfo = userInfoStr ? JSON.parse(userInfoStr) : {};

export type Employee = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string;
  date_of_birth: string; // Consider using a proper date type if possible
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  longitude?: number; // Optional field
  latitude?: number; // Optional field
  job: string;
  profile_picture?: string | null; // Profile picture can be a string (URL) or null (if no picture)
};

export type UserRegister = {
  id: string,
  phonenumber: string;
  regitype: string;
  codenumber: string;
  loginid: string;
  passwordcode: string;
  status: string;
}

export type PaymentDeposits = {
  id: string,
  amount: number,
  paymentoption: string,
  paymenttype: string,
  paymentstatus: string,
  date: Date,
}

export type PaymentWithdrawals ={
  id: string,
  amount: number,
  paymentoption: string,
  paymenttype: string,
  paymentstatus: string,
  tip: string,
  date: Date,
}

export type AdminRegisterUsers = {
  _id: string;
  firstname:string;
  lastname:string;
  email:string;
  ip: string; 
  cashtag: string;
  register: UserRegister[];
  deposit: PaymentDeposits[];
  withdrawal: PaymentWithdrawals[];
};

export const navItems: NavItem[] = userInfo.role === "admin" ? [
  {
    title: 'Main',
    href: '/main',
    icon: 'dashboard',
    label: 'main'
  },
  {
    title: 'Register',
    href: '/main/register',
    icon: 'user',
    label: 'register'
  },
  {
    title: 'Code Verify',
    href: '/main/verify',
    icon: 'verify',
    label: 'verify'
  },
  {
    title: 'Deposit',
    icon: 'wallet',
    label: 'deposit',
    children: [
      {
        title: "Request",
        href: '/main/deposit',
        icon: 'wallet',
        label: 'depositRequest'
      },
      {
        title: "History",
        href: '/main/depositHistory',
        icon: 'notebookpen',
        label: 'depositHistory'
      }
    ]
  },
  {
    title: 'Withdrawal',
    icon: 'wallet2',
    label: 'withdrawal',
    children: [
      {
        title: "Request",
        href: '/main/withdrawal',
        icon: 'wallet2',
        label: 'withdrawalRequest'
      },
      {
        title: "History",
        href: '/main/withdrawalHistory',
        icon: 'notebookpen',
        label: 'withdrawalHistory'
      }
    ]
  },
  {
    title: 'Cash App Info',
    href: '/main/cashappinfo',
    icon: 'user2',
    label: 'kanban'
  },
] : [
  {
    title: 'Mypage',
    href: '/mypage',
    icon: 'userPen',
    label: 'mypage'
  },
  {
    title: 'Register',
    href: '/mypage/register',
    icon: 'user',
    label: 'register'
  },
  {
    title: 'Deposit',
    href: '/mypage/deposit',
    icon: 'wallet',
    label: 'deposit'
  },
  {
    title: 'Withdrawal',
    href: '/mypage/withdrawal',
    icon: 'wallet2',
    label: 'withdrawal'
  },
  {
    title: 'Notification',
    href: '/mypage/notification',
    icon: 'ring',
    label: 'mypage'
  }
];
