"use client"
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

export function Disaster(){
//   const [disasterInfo, setDisasterInfo] = useState<disasterInfo | null>(null);
//   const pathname = usePathname();

//   useEffect(() => {
//     const pathSegments = pathname.split("/");
//     const disasterId = pathSegments[2];

//     const getDisasterDetail = async () => {
//       try {
//         const res = await axios(`https://worldisaster.com/api/disasters/${disasterId}`);
//         setDisasterInfo(res.data);
//         console.log("재난 데이터 가져오기 성공");
//       } catch(error) {
//         console.log("재난 데이터 가져오기 실패", error);
//       }
//     };

//     if (pathSegments) {
//       getDisasterDetail();
//     } 
//   }, [pathname]);

  return (
    <>
      <main className='flex flex-row'>
        <LeftSidebar />
        <section className='main-container'>
          하트
        </section>
        <RightSidebar />
      </main>
    </>
  );
};


export default Disaster;