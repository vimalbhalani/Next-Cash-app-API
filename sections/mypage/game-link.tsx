'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";

export const GameLink = () => {

  const router = useRouter();

  const firekirin = () => {
    router.push("https://firekirin.com/download-fire-kirin-app.html");
  }
  const gamevault = () => {
    router.push("https://gamevault-download.com");
  }
  const juwa = () => {
    router.push("https://juwa777.app");
  }
  const milkyway = () => {
    router.push("http://play.milkywayapp.xyz/game/milkyway");
  }
  const orionstar = () => {
    router.push("https://orionstarsvip.com/pages/download_game");
  }
  const panda = () => {
    router.push("https://apkcombo.com/ultra-panda/com.matthewsstudio.ultrapanda");
  }
  const vblink = () => {
    router.push("https://vblink.net");
  }
  const vagrs = () => {
    router.push("https://vegassweep.net");
  }
  const yolo = () => {
    router.push("https://yolo777.net");
  }
  return (
    <div className='flex lg:justify-center overflow-x-auto w-full'>
      <Image src="/firekirin.png" width={100} height={100} alt="firekirin" className="hover:opacity-85 hover:cursor-pointer" onClick={firekirin} />
      <Image src="/gamevault.png" width={100} height={100} alt="gamevault" className="hover:opacity-85 hover:cursor-pointer" onClick={gamevault} />
      <Image src="/juwa.png" width={100} height={100} alt="juwa" className="hover:opacity-85 hover:cursor-pointer" onClick={juwa} />
      <Image src="/milkyway.png" width={100} height={100} alt="milkyway" className="hover:opacity-85 hover:cursor-pointer" onClick={milkyway} />
      <Image src="/orionstar.png" width={100} height={100} alt="orionstar" className="hover:opacity-85 hover:cursor-pointer" onClick={orionstar} />
      <Image src="/panda.png" width={100} height={100} alt="orionstar" className="hover:opacity-85 hover:cursor-pointer" onClick={panda} />
      <Image src="/vblink.png" width={100} height={100} alt="vblink" className="hover:opacity-85 hover:cursor-pointer" onClick={vblink} />
      <Image src="/vegrs.png" width={100} height={100} alt="vegrs" className="hover:opacity-85 hover:cursor-pointer" onClick={vagrs} />
      <Image src="/yolo.png" width={100} height={100} alt="yolo" className="hover:opacity-85 hover:cursor-pointer" onClick={yolo} />
    </div>
  );
};
