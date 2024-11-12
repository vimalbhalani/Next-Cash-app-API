'use client';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { AdminRegisterUsers, Paymentredeems, PaymentWithdrawals, UserRegister } from '@/constants/data';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Request {
  registerR: number,
  verifyR: number,
  redeemR: number,
  withdrawalR: number
}

export function UserNav() {

  // Get the string from localStorage
  const userInfoStr = localStorage.getItem('userinfo')
  const userInfo = userInfoStr ? JSON.parse(userInfoStr) : {};
  const { data: session, status } = useSession();
  const [registerRequest, setPreparingCount] = useState<number>(0);
  const [verifyRequest, setProcessingCount] = useState<number>(0);
  const [redeemRequest, setCombinedDataCount1] = useState<number>(0);
  const [withdrawalRequest, setCombinedDataCount2] = useState<number>(0);
  
  useEffect(() => {
    if (status === "authenticated") {
      localStorage.setItem('userinfo', JSON.stringify(session.userInfo));
    }
  }, []);

  const router = useRouter();
  const signOut = () => {
    localStorage.clear();
    router.push("/");
  }
  const ok=()=>{}

  useEffect(() => {
    async function fetchData() {
      try {
        const registerResponse = await fetch('/api/admin/getregister'); 
        const registerResult = await registerResponse.json();
        
        const usersResponse = await fetch('/api/admin/getregister'); 
        const usersResult = await usersResponse.json();
        
        const combinedData = registerResult.data.flatMap((registerEntry:any) => 
          registerEntry.register.map((register: UserRegister) => {
            const user = usersResult.data.find((user: AdminRegisterUsers) => user._id === register.id);          
            return { ...register, user }; 
          })
        );
        const preparingItemsCount = combinedData.filter((item) => item.status === 'preparing').length;
        setPreparingCount(preparingItemsCount);
      } catch (error) {
        console.error('Error fetching data:', error);
      } 
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const registerResponse = await fetch('/api/admin/getuserverify'); // Your API for redeems
        const registerResult = await registerResponse.json();
        
        const usersResponse = await fetch('/api/admin/getuserverify'); // Your API for users
        const usersResult = await usersResponse.json();
        
        const combinedData = registerResult.data.flatMap((completeRegsiterEntry:any) => 
          completeRegsiterEntry.completeRegisters.map((register: UserRegister) => {
            const user = usersResult.data.find((user: AdminRegisterUsers) => user._id === register.id);          
            return { ...register, user }; 
          })
        );
        const processingItemsCount = combinedData.filter((item) => item.status === 'Processing').length;        
        setProcessingCount(processingItemsCount);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);
  
  useEffect(() => {
    async function fetchData() {
      try {
        const redeemsResponse = await fetch('/api/admin/getuser');
        const redeemsResult = await redeemsResponse.json();
        
        const usersResponse = await fetch('/api/admin/getuser'); 
        const usersResult = await usersResponse.json();
        
        const combinedData = redeemsResult.data.flatMap((redeemEntry: any) => 
          redeemEntry.redeem
            .filter((redeem: Paymentredeems) => redeem.paymentstatus === "Processing")
            .map((redeem: Paymentredeems) => {
              const user = usersResult.data.find((user: AdminRegisterUsers) => user._id === redeem.id);
              return { ...redeem, user }; 
            })
        );
        setCombinedDataCount1(combinedData.length);
      } catch (error) {
        console.error('Error fetching data:', error);
      } 
    }  
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const withdrawalsResponse = await fetch('/api/admin/getuser'); // Your API for withdrawals
        const withdrawalsResult = await withdrawalsResponse.json();
        
        const usersResponse = await fetch('/api/admin/getuser'); // Corrected API for users
        const usersResult = await usersResponse.json();

        const filteredWithdrawals = withdrawalsResult.data.flatMap((withdrawalEntry: any) =>
          withdrawalEntry.withdrawal.filter((withdrawal: PaymentWithdrawals) => withdrawal.paymentstatus === "Processing")
      );

        const combinedData = filteredWithdrawals.map((withdrawal: PaymentWithdrawals) => {
          const user = usersResult.data.find((user: AdminRegisterUsers) => user._id === withdrawal.id);
          return { ...withdrawal, user };
        });

        setCombinedDataCount2(combinedData.length);
      } catch (error) {
        console.error('Error fetching data:', error);
      } 
    }
    fetchData();
  }, []);

  const request: Request = {
    registerR : registerRequest,
    verifyR : verifyRequest,
    redeemR : redeemRequest,
    withdrawalR : withdrawalRequest
  }
  
  localStorage.setItem('adminRequest', JSON.stringify(request));
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button  variant="outline" size="icon" handleClick={ok}>
          <Image src='/log-out.png' width={25} height={25} alt='log-out'/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {userInfo.name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {userInfo.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
  // }
}
