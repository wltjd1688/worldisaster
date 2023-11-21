"use client";
import { useEffect, useState } from "react"
import LeftSidebar from "../../components/LeftSidebar"
import { usePathname } from "next/navigation";
import path from "path";

export async function Nation() {
  const [country, setCountry] = useState([]);
  const pathname = usePathname();
  const pathSegments = pathname.split("/");
  console.log(pathSegments[2]);

  useEffect(() => {
    getCountury();
  }, [])

  const getCountury = async () => {
    try {
      const res = await fetch(`https://worldisaster.com/api/country/${pathSegments[2]}`);
      const data = await res.json();
      console.log("국가 데이터 가져오기 성공");
      setCountry(data);
    } catch(error) {
      console.log("국가 데이터 가져오기 실패",error);
    }
  }

  return (
    <>
      <main className='flex flex-row'>
        <LeftSidebar />
        <section className='main-container'>
          <div className='w-full max-w-7xl'>국가정보</div>
        </section>
      </main>
    </>
  )
}

export default Nation;