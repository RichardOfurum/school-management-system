import { Facebook, Instagram, Mail, MapPin, Phone, Youtube } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <>
        <div className='text-gray-50 flex flex-col md:flex-row gap-6 p-4 md:p-6 pt-14 pb-14 bg-stone-800'>

            {/* fist div */}
            <div className='flex-1 flex-wrap flex flex-col gap-4'>
                <h1 className='font-semibold text-xl md:text-xl'>Ridges International School </h1>
                <p className='font-extralight'>Empowering minds, inpiring futures. Ridges International school is dedicated to providing exceptional education and fostering a community of lifelong learners.</p>
                <div className='flex gap-6 '>
                    <Facebook />
                    <Instagram />
                    <Youtube />
                </div>

            </div>

            {/* second div  */}
            <div className='flex-1 flex-wrap flex flex-col gap-4'>
                <h1 className='font-semibold text-xl'>Quick Links</h1>
                <Link href="about">About Us</Link>
                <Link href="mission">Mission</Link>
                <Link href="blog">Blog News & Events</Link>
                <Link href="contact">Contact</Link>
                <Link href="prospectus">Prospectus</Link>
                <Link href="faq">FAQ</Link>
            </div>

            {/* third div  */}
            <div className='flex-1 flex-wrap flex flex-col gap-4'>
                <h1 className='font-semibold text-xl'>Contact Information</h1>
                <p className='flex gap-2 font-extralight'><MapPin/> 123 Education Street, Academit City, ST 12345</p>
                <p className='flex gap-2 font-extralight'><Phone /> (123) 456-7890</p>
                <p className='flex gap-2 font-extralight'><Mail /> info@ridges.com</p>
            </div>

            {/* fourth div  */}
            <div className='flex-1 flex-wrap flex flex-col gap-4'>
                <h1 className='font-semibold text-xl text-white'>School Hours</h1>
                <p className='font-extralight'>Monday - Friday: 8:00 AM - 3:00 PM</p>
                <p className='font-extralight'>Saturday: Closed</p>
                <p className='font-extralight'>Sunday: Closed</p>

                <h1 className='font-semibold textxl'>Administratic Office:</h1>
                <p>8:00 AM - 4:30 PM (Mon-Fri)</p>
            </div>

            </div>

            <div className='bg-stone-900 flex items-center justify-center h-10 text-stone-400'>
                <span className='text-sm'>&copy; 2025 Ridges International School, ALl rights reserved.</span>
            </div>
    </>
  )
}

export default Footer
