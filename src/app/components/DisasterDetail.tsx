"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { usePathname } from "next/navigation";

// Define an interface for the country information
interface Info {
  dTitle: string;
  dCountryCode: string;
  dCountry: string;
  dType: string;
  dDate: string;
  dDescription: string;
  dLatitude: number;
  dLongitude: number;
}

const DisasterInfo: React.FC<Info> = (props) => {

  return (
    <>
      <div className='w-full max-w-4xl my-5'>
        <div className='flex flex-1 flex-col justify-start'>
            <h3 className='text-heading4-medium text-light-1'>{props.dTitle}({props.dCountryCode})</h3>
            <div className='mt-7 flex w-[350px] flex-col gap-9'>
              <p className='text-light-3'>도시: {props.dCountry}[위도:{props.dLatitude}, 경도: {props.dLongitude}]</p>
              <p className='text-light-3'>날짜: {props.dDate}</p>
              <p className='text-light-3'>설명: {props.dDescription}</p>   
              {/* 마지막 줄이 디스크립션인데 이거 ...기능 넣어주 */}
            </div>
        </div>
      </div>
    </>
  );
}

export default DisasterInfo;
