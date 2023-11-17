import React from 'react';
import { Slider } from './components/Slider';
import EarthCanvas from './components/Earth';


export default function Home() {

  return (
    <>
      <div className=' flex flex-col items-center h-[90vh] relative'>
        <EarthCanvas/>
        <Slider />
      </div>
    </>
  )
}