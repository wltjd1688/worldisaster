"use client"
import axios from 'axios';
import LeftSidebar from "../../components/LeftSidebar";
// import RightSidebar from "../../components/RightSidebar";
import { useEffect, useState } from 'react';
import { usePathname } from "next/navigation";
import {Select, SelectItem, Card, CardBody} from "@nextui-org/react";
import {NextUIProvider} from "@nextui-org/react";
import disasterType from "@/app/components/disasterType";
import countryList from '@/app/components/countryList';
import yearList from "@/app/components/yearList";

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
          <section className="main-container flex-1">
            <div className="flex w-full gap-5 p-2 max-w-7xl">
            <Card className=" p-3 w-[100%]">
              <div className=" inline-block">
                <Select 
                  label="Select an Year" 
                  className="max-w-xs" 
                  labelPlacement="outside-left"
                >
                  {yearList.map((elem,index) => (
                    <SelectItem key={index} value={elem.value} className=' text-slate-400'>
                      {elem.label}
                    </SelectItem>
                  ))}
                </Select>
                <Select 
                  label="Select an Disaster Type" 
                  className="max-w-xs" 
                  labelPlacement="outside-left"
                >
                  {disasterType.map((elem,index) => (
                    <SelectItem key={index} value={elem.value} className=' text-slate-400'>
                      {elem.label}
                    </SelectItem>
                  ))}
                </Select>
                <Select
                  label="Select an Country"
                  className="max-w-xs" 
                  labelPlacement="outside-left"
                >
                  {countryList.map((elem,index) => (
                    <SelectItem key={elem.value} value={elem.value} className=' text-slate-400'>
                      {elem.label}
                    </SelectItem>
                  ))}
                </Select>
              </div>
            </Card>
            </div>  
          </section>
          
        </main>
      </NextUIProvider>
    </>
  );
};


export default Disaster;
