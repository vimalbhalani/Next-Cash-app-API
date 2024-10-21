// UserRegistrationForm.client.js
"use client"; // Ensures this is recognized as a client component
import { Button } from '@/components/ui/button';
import { useState, useRef, useTransition, useEffect } from 'react';
import { useToast, toast } from '@/components/ui/use-toast';
import { AdminRegisterUsers } from '@/constants/data';


export default function CashAppInfoPageView() {
    const [data, setData] = useState<AdminRegisterUsers[]>([]);
    const [cashapptag, setCashapptag] = useState(data);
    const { dismiss } = useToast();
    const [loading, startTransition] = useTransition();
    const [bitcoinAddress] = useState("bc1q9fsmlxu6rgjatnt75qccj9v7kq7jjja38ca9p4");
    const inputRef = useRef<HTMLInputElement>(null);

    const userInfoStr = localStorage.getItem('userinfo')
    const userInfo = userInfoStr ? JSON.parse(userInfoStr) : {};

    
    const copyToClipboard = () => {
        if (inputRef.current) {
            inputRef.current.select();
            document.execCommand("copy");
            toast({
                title: "BTC Address Copied Successful!",
                description: "Welcome! Your bidcoin address have copied successfully.",
                action: <button onClick={dismiss}>BTC Address</button>,
            })
        } else {
            toast({
                title: "BTC Address Copied Failed!",
                description: "Your bidcoin address have copied failed. Please try again!",
            })
        }
    }
    
    const cashappinfo = async () => {
        
        
        startTransition(async () => {
            try {
                // Replace signIn with your signUp function or API call
                const response = await cash({
                    cashtag: cashapptag,
                    token: userInfo.token
                });
                
                console.log(response, "response");
                
                if (response.error) {
                    // Handle error (e.g. show error message)
                    console.error('Cashtag updated error:', response.error);
                    return;
                }
                
                
            } catch (error) {
                // Handle errors that do not come from the response
                console.log("Update cashtag failed", error);
                
            }
        });
    };
    
    // Example signUp function
    const cash = async (userData: { cashtag: any, token: string }) => {
        try {
            const response = await fetch('/api/admin/cashapptag', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                return { error: errorData.message || 'Cashapptag update failed' }; // Handle response error
            }
            
            
            return await response.json(); // Assume successful response returns user data or a success message
        } catch (error) {
            console.error('Error during fetch:', error);
            throw error; // Rethrow or return an error response
        }
    };
    
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('/api/admin/getadmin'); // Replace with your API endpoint
                const result = await response.json();
                console.log(result);
                
                setData(result.data[0].cashtag); // Adjust based on your API response
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
            }
        }
        
        fetchData();
      }, []);

      const cashappinfoview = ()=>{
          
          window.location.href = `https://cash.app/qr/${data}`;
      }

    
    if (loading) {
        return <div>Loading...</div>; // Replace with a spinner or loading message if needed
    }
    
    return (
        <div className='grid md:grid-cols-2 gap-5'>
            <div>
                <div className='grid justify-items-center' >
                    <div className='flex items-center text-center w-52 h-52 mt-20 self-auto'>After enter your cashtag and clicking "OK", you can save the cash app QR code information. And then cliking "QR code view", you can see QR code.</div>
                </div>
                <div className='flex items-center justify-center mt-5'>
                    <input
                        type='text'
                        defaultValue={data}
                        className='border p-2 w-1/2 text-center outline-none rounded-md'
                        onChange={(e) => { setCashapptag(e.target.value) }}
                        />
                </div>
                <Button className='border p-6 ml-[30%] w-[40%] mt-16' handleClick={cashappinfoview}>QR code view</Button>
                <Button className='border p-6 ml-[30%] w-[40%] mt-11' handleClick={cashappinfo}>OK</Button>
            </div>
            <div>
                <div className='grid justify-items-center'>
                    <img src='/admin-btcaddress.png' className='border w-52 h-52 mt-20 self-auto' alt='Bitcoin Address' />
                </div>
                <div className='flex items-center justify-center mt-5'>
                    <input
                        type='text'
                        value={bitcoinAddress}
                        readOnly
                        className='border p-2 w-1/2 text-center outline-none rounded-md'
                        ref={inputRef}
                    />
                    <Button className='border py-5' handleClick={copyToClipboard}>
                        Copy
                    </Button>
                </div>
                <h1 className='border mt-32 ml-[30%] w-[40%] p-3 text-center text-xl font-bold'>Bitcoin Address</h1>
            </div>
        </div>
    );
}
