import { NavItem } from '@/types';

const userInfoStr = localStorage.getItem('userinfo')
const userInfo = userInfoStr ? JSON.parse(userInfoStr) : {};

const requestStr = localStorage.getItem('adminRequest')
const request = requestStr ? JSON.parse(requestStr) : {};

export type UserRegister = {
  id: string,
  phonenumber: string;
  category: string;
  codenumber: string;
  loginid: string;
  passwordcode: string;
  date: Date,
  status: string;
}

export type Paymentredeems = {
  id: string,
  amount: number,
  paymentoption: string,
  paymenttype: string,
  paymentstatus: string,
  dailyChecked: boolean,
  bonusChecked: boolean,
  date: Date,
  comdate: Date,
}

export type PaymentWithdrawals ={
  id: string,
  amount: number,
  paymentoption: string,
  paymenttype: string,
  paymentstatus: string,
  date: Date,
  comdate: Date,
}

export type AdminRegisterUsers = {
  _id: string;
  firstname:string;
  lastname:string;
  tag:number;
  email:string;
  ip: string; 
  cashtag: string;
  venmo:string;
  paypal:string;
  zelle:string;
  bitcoin:string;
  register: UserRegister[];
  redeem: Paymentredeems[];
  withdrawal: PaymentWithdrawals[];
};

export const navItems: NavItem[] = userInfo.role === "admin" ? [
  {
    title: 'Main',
    href: '/main',
    icon: 'dashboard',
    label: 'main',
    alarm: ''
  },
  {
    title: 'Register',
    href: '/main/register',
    icon: 'user',
    label: 'register',
    alarm: `${request.registerR}`
  },
  {
    title: 'Code Verify',
    href: '/main/verify',
    icon: 'verify',
    label: 'verify',
    alarm: `${request.verifyR}`
  },
  {
    title: 'Redeem',
    icon: 'wallet',
    label: 'redeem',
    alarm: `${request.redeemR}`,
    children: [
      {
        title: "Request",
        href: '/main/redeem',
        icon: 'wallet',
        label: 'redeemRequest',
        alarm: `${request.redeemR}`
      },
      {
        title: "History",
        href: '/main/redeemhistory',
        icon: 'notebookpen',
        label: 'redeemHistory',
        alarm: ''
      }
    ]
  },
  {
    title: 'Withdrawal',
    icon: 'wallet2',
    label: 'withdrawal',
    alarm: `${request.withdrawalR}`,
    children: [
      {
        title: "Request",
        href: '/main/withdrawal',
        icon: 'wallet2',
        label: 'withdrawalRequest',
        alarm: `${request.withdrawalR}`
      },
      {
        title: "History",
        href: '/main/withdrawalhistory',
        icon: 'notebookpen',
        label: 'withdrawalHistory',
        alarm: ''
      }
    ]
  },
  {
    title: 'Payment Setting',
    href: '/main/cashappinfo',
    icon: 'settings',
    label: 'setting',
    alarm: ''
  },
  {
    title: 'User',
    href: '/main/user',
    icon: 'user2',
    label: 'user',
    alarm: ''
  },
  {
    title: 'Banned List',
    href: '/main/bannedlist',
    icon: 'warning',
    label: 'banned list',
    alarm: ''
  },
] : [
  {
    title: 'Promotion',
    href: '/mypage',
    icon: 'product',
    label: 'mypage',
    alarm: ''
  },
  {
    title: 'Mypage',
    href: '/mypage/promotion',
    icon: 'userPen',
    label: 'promotion',
    alarm: ''
  },
  {
    title: 'Register',
    href: '/mypage/register',
    icon: 'user',
    label: 'register',
    alarm: ''
  },
  {
    title: 'Deposit',
    href: '/mypage/deposit',
    icon: 'wallet',
    label: 'redeem',
    alarm: ''
  },
  {
    title: 'Withdrawal',
    href: '/mypage/withdrawal',
    icon: 'wallet2',
    label: 'withdrawal',
    alarm: ''
  },
];
