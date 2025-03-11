import Faq from '@/components/ui/Faq'
import Footer from '@/components/ui/Footer'
import Header from '@/components/ui/Header'
import JoinOurCommunity from '@/components/ui/JoinOurCommunity'
import React from 'react'

const page = () => {
  return (
    <>
            <Header/>
            <div className="w-full bg-white flex flex-col">
    
              <div className='bg-blue-700 w-full flex flex-col gap-6 text-white items-center justify-center pt-28 pb-16'>
                  <h1 className="text-4xl font-bold">
                    FAQs
                  </h1>
                  <div>
                      
                      {/* <p className='text-center'>
                        Reach out to us through any of the channels below or visit our campus.
                      </p> */}
                  </div>
              </div>

             
              <Faq/>

              <JoinOurCommunity/>
              <Footer/>
            </div>
        </>
  )
}

export default page
