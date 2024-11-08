import { NavItem } from '@/types';

const userInfoStr = localStorage.getItem('userinfo')
const userInfo = userInfoStr ? JSON.parse(userInfoStr) : {};

export type UserRegister = {
  id: string,
  phonenumber: string;
  category: string;
  codenumber: string;
  loginid: string;
  passwordcode: string;
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
}

export type PaymentWithdrawals ={
  id: string,
  amount: number,
  paymentoption: string,
  paymenttype: string,
  paymentstatus: string,
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
  redeem: Paymentredeems[];
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
    title: 'Redeem',
    icon: 'wallet',
    label: 'redeem',
    children: [
      {
        title: "Request",
        href: '/main/redeem',
        icon: 'wallet',
        label: 'redeemRequest'
      },
      {
        title: "History",
        href: '/main/redeemhistory',
        icon: 'notebookpen',
        label: 'redeemHistory'
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
        href: '/main/withdrawalhistory',
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
    title: 'Redeem',
    href: '/mypage/redeem',
    icon: 'wallet',
    label: 'redeem'
  },
  {
    title: 'Withdrawal',
    href: '/mypage/withdrawal',
    icon: 'wallet2',
    label: 'withdrawal'
  },
  {
    title: 'Promotion',
    href: '/mypage/promotion',
    icon: 'product',
    label: 'promotion'
  },
  {
    title: 'Notification',
    href: '/mypage/notification',
    icon: 'ring',
    label: 'mypage'
  }
];
