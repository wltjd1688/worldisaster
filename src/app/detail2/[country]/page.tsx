"use client"
import axios from 'axios';
import LeftSidebar from "../../components/LeftSidebar";
// import RightSidebar from "../../components/RightSidebar";
import { useEffect, useState } from 'react';
import { usePathname } from "next/navigation";
import {Select, SelectItem} from "@nextui-org/react";
import {NextUIProvider} from "@nextui-org/react";

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
  const [disasterInfo, setDisasterInfo] = useState<disasterInfo | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const pathSegments = pathname.split("/");
    const disasterId = pathSegments[2];

    const getDisasterDetail = async () => {
      try {
        const res = await axios(`https://worldisaster.com/api/disasters/${disasterId}`);
        setDisasterInfo(res.data);
        console.log("재난 데이터 가져오기 성공");
      } catch(error) {
        console.log("재난 데이터 가져오기 실패", error);
      }
    };

    if (pathSegments) {
      getDisasterDetail();
    } 
  }, [pathname]);

  return (
    <>
      <NextUIProvider>
        <main className='flex flex-row'>
          <LeftSidebar />
          <Select 
              label="Select an animal" 
              className="max-w-xs" 
            >

            <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4">
              <Select
                labelPlacement="outside-left"
                label="Favorite Animal"
                className="max-w-xs"
                >
                  <SelectItem key={1} value="asdf">
                    asdf
                  </SelectItem>
              </Select>
            </div>
          </Select>
        </main>
      </NextUIProvider>
    </>
  );
};


export default Disaster;
