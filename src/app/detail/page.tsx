"use client"

import LeftSidebar from "../components/LeftSidebar"
import RightSidebar from "../components/RightSidebar"
import "../globals.css"

export default function Detail() {
  return (
    <>
      <main className='flex flex-row'>
          <LeftSidebar />
          <section className='main-container'>
            <div className='w-full max-w-4xl'></div>
          </section>
          <RightSidebar />
      </main>
    </>
  )
}