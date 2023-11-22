"use client";
import axios from 'axios';
import LeftSidebar from "../../components/LeftSidebar";
import RightSidebar from "../../components/RightSidebar";
import { useEffect, useState } from 'react';
import { usePathname } from "next/navigation";
import path from 'path';

interface disasterInfo {
  dTitle: string;
  dCountryCode: string;
  dCountry: string;
  dType: string;
  dDate: string;
  dDescription: string;
  dLatitude: number;
  dLongitude: number;
}

export async function Disaster(){
  const [disasterInfo, setDisasterInfo] = useState<disasterInfo | null>(null);
  const pathname = usePathname();
  const pathSegments = pathname.split("/");

  useEffect(() => {
    const getDisaster = async () => {
      try {
        const res = await axios(`https://worldisaster.com/api/disasters/${pathSegments[2]}`);
        setDisasterInfo(res.data);
        console.log("재난 데이터 가져오기 성공");
      } catch(error) {
        console.log("재난 데이터 가져오기 실패", error);
      }
    };
  }, [pathname]);

  return (
    <>
      <main className='flex flex-row'>
        <LeftSidebar />
        <section className='main-container'>
        </section>
        <RightSidebar />
      </main>
    </>
  );
};


export default Disaster;
