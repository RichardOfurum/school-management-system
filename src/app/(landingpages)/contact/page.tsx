import SocicalContact from '@/components/landingpages/v1.0/SocicalContact'
import Faq from '@/components/landingpages/v1.1/Faq'
import Footer from '@/components/landingpages/v1.1/Footer'
import Header from '@/components/landingpages/v1.1/Header'
import { Clock2, Mail, MapPin, Phone } from 'lucide-react'
import React from 'react'

const ContactPage = () => {
  return (
    <>
            <Header/>
            <div className="w-full bg-white flex flex-col">
    
              <div className='bg-sky-950 w-full flex flex-col gap-6 text-white items-center justify-center pt-28 pb-16'>
                  <h1 className="text-4xl font-bold">
                    Contact Us
                  </h1>
                  <div>
                      <p className='text-center font-mono'>
                        We are here to answer your questions and provide information about Ridges International School.
                      </p>
                      <p className='text-center'>
                        Reach out to us through any of the channels below or visit our campus.
                      </p>
                  </div>
              </div>

              <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 w-full p-2 bg-white text-center py-10'>
                  
                  <div className='bg-gray-50 p-6 rounded-md flex flex-col gap-3 items-center'>
                      <div className='bg-gray-100 p-4 rounded-full cursor-pointer'>
                          <MapPin className="text-sky-950" />
                      </div>
                      <h1 className='font-bold text-sky-950 text-xl'>Address</h1>
                      <p className='text-md font-mono font-bold text-emerald-950'>
                        123 education street academy City, ST 12345 imo State nigeria
                      </p>
                  </div>
                  
                  <div className='bg-gray-50 p-6 rounded-md flex flex-col gap-3 items-center'>
                      <div className='bg-gray-100 p-4 rounded-full cursor-pointer'>
                          <Phone className="text-sky-950" />
                      </div>
                      <h1 className='font-bold text-sky-950 text-xl'>Phone</h1>
                      <p className='text-md font-mono font-bold text-emerald-950'>
                        Main Office: +2348127462544
                        <br />
                        Admissoin: +2348127462544
                      </p>
                  </div>

                  <div className='bg-gray-50 p-6 rounded-md flex flex-col gap-3 items-center'>
                      <div className='bg-gray-100 p-4 rounded-full cursor-pointer'>
                          <Mail className="text-sky-950" />
                      </div>
                      <h1 className='font-bold text-sky-950 text-xl'>Email</h1>
                      <p className='text-md font-mono font-bold text-emerald-950'>
                        General:
                        info@ridges.com
                        <br />
                        Admissions:
                        admission@ridges.com
                      </p>
                  </div>

                  <div className='bg-gray-50 p-6 rounded-md flex flex-col gap-3 items-center'>
                      <div className='bg-gray-100 p-4 rounded-full cursor-pointer'>
                          <Clock2 className="text-sky-950" />
                      </div>
                      <h1 className='font-bold text-sky-950 text-xl'>Hours</h1>
                      <p className='text-md font-mono font-bold text-emerald-950'>
                        Monday -Friday: 8:00 AM - 4:30 PM
                        <br />
                        Saturday: 9:00 AM - 12:00 PM 
                        <br />
                        (Admin Office)
                        <br />
                        Sunday : Closed
                      </p>
                  </div>

              </div>

              <Faq/>

              {/* <DepartmentContacts/> */}

              <SocicalContact/>
              <Footer/>
            </div>
        </>
  )
}

export default ContactPage
