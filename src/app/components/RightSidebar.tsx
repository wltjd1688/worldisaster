"use client"

import "../globals.css"

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

export default RightSidebar;