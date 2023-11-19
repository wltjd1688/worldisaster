"use client"

import "../globals.css"
import Image from "next/image";
import Link from "next/link";
import { sidebarLinks } from "@/app/constants/index";
import { usePathname, useRouter } from "next/navigation";

const LeftSidebar = () => {

  const router = useRouter();
  const pathname = usePathname();

  return (
    <>
      <section className='custom-scrollbar leftsidebar'>
        <div className='flex w-full flex-1 flex-col gap-6 px-6'>
        {sidebarLinks.map((link) => {
            const isActive = (pathname.includes(link.route) && link.route.length > 1) || pathname === link.route;

            return (
              <Link
                href={link.route}
                key={link.label}
                className={`leftsidebar_link ${isActive && "bg-primary-500 "}`}
              >
                <Image
                  src={link.imgURL}
                  alt={link.label}
                  width={24}
                  height={24}
                />
                <p className='text-light-1 max-lg:hidden'>{link.label}</p>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  )
}

const RightSidebar = () => {

  return (
    <>
    <section className='custom-scrollbar rightsidebar'>
      <div className='flex flex-1 flex-col justify-start'>
        <h3 className='text-heading4-medium text-light-1'>
          실시간 영상 및 기사
        </h3>

        <div className='mt-7 flex w-[350px] flex-col gap-9'>
          <p className='!text-base-regular text-light-3'>
              No data yet
          </p>
        </div>
      </div>

      <div className='flex flex-1 flex-col justify-start'>
        <h3 className='text-heading4-medium text-light-1'>채팅</h3>
        <div className='mt-7 flex w-[350px] flex-col gap-10'>
          <p className='!text-base-regular text-light-3'>-</p>
        </div>
      </div>
    </section>
    </>
  )
}


export default function Detail() {
  return (
    <>
      <main className='flex flex-row'>
            <LeftSidebar />
            <section className='main-container'>
              <div className='w-full max-w-4xl'>상세페이지입니다.</div>
            </section>
            {/* @ts-ignore */}
            <RightSidebar />
          </main>
    </>
  )
}