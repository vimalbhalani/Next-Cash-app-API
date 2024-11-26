"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";


export default function UserChat() {

  const router = useRouter();

  const facebook = () => {
    router.push("https://www.facebook.com/profile.php?id=61564819906157&mibextid=ZbWKwL");
  }

  const instagram = () => {
    router.push("https://www.instagram.com/islandhouse2000/");
  }

  const goback = () => {
    router.push("/mypage")
  }

  return (
    <div>
      <div className='border border-solid border-4 border-gray-200 p-3 bg-blue-400 rounded-xl w-full mt-10'>
        <p className='text-center text-sm mt-2 text-white font-semibold '>
          Sorry, chat function will be added soon! Until then, please use Instagram and Facebook🙂
        </p>
      </div>
      <div className='mt-10 flex lg:evenly justify-evenly'>
        <Image src="/facebook.png" width={100} height={100} className='hover:opacity-80 hover:cursor-pointer' onClick={facebook} alt='facebook'></Image>
        <Image src="/instagram.png" width={100} height={100} className='hover:opacity-80 hover:cursor-pointer' onClick={instagram} alt='instagram'></Image>
      </div>
      <div className="flex justify-center mt-10">
      <Button variant="default" handleClick={goback} className="text-white w-[80vw]">Back to Main Page</Button>
      </div>
    </div>
  );
}