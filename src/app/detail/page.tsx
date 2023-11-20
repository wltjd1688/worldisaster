"use client"

import "../globals.css"
import LeftSidebar from "../components/LeftSidebar"
import RightSidebar from "../components/RightSidebar"
import React from "react";
import { Inter } from "next/font/google";


const inter = Inter({ subsets: ["latin"] });


export function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <html lang='en'>
        <body className={inter.className}>
          <main className='flex flex-row'>
            <LeftSidebar />
            <section className='main-container'>
              <div className='w-full max-w-4xl'>{children}</div>
            </section>
            <RightSidebar />
          </main>
        </body>
      </html>
  );
}