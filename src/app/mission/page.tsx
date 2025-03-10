import Footer from '@/components/ui/Footer'
import Header from '@/components/ui/Header'
import JoinOurCommunity from '@/components/ui/JoinOurCommunity'
import React from 'react'
import Image from 'next/image'
import Mission from '@/components/ui/mission'
import Vission from '@/components/ui/Vission'
import Values from '@/components/ui/Values'

const MissionPage = () => {
  return (
    <>
        <Header/>
        <div className="w-full bg-white flex flex-col">

            <div className='bg-blue-700 text-white flex flex-col md:flex-row p-2 lg:p-28 gap-6 pt-10 pb-10 items-center my-10'>
                <div className='w-full md:w-1/2'>
                    <h1 className='text-4xl font-bold lg:text-4xl'>Our Mission & Vission</h1>
                    <p className='text-lg'>
                      At Ridges Academy, we are guided by a clear mission and vission that shapes everything we do, from curriculum development to daily interaction with students.
                    </p>
                </div>
                <div className='w-full md:w-1/2 h-auto rounded-md lg:pt-2 '>
                    <Image src="/hero.png" height={500} width={500} alt="" 
                    className='w-full object-cover rounded-md'
                    />
                </div>
            </div>
     
            <Mission />
            
            <Vission/>

            <Values/>

          <JoinOurCommunity/>
          <Footer/>
        </div>
    </>
  )
}

export default MissionPage
