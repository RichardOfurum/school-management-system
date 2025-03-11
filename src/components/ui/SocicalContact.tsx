import { Facebook, Instagram, Youtube } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

const SocicalContact = () => {
  return (
    <div className='flex flex-col p-10 items-center justify-center gap-4 bg-blue-700 text-white'>
        <h1 className='font-bold text-2xl'>Connect Whit Us on Social Media</h1>
        <p className='text-sm text-center'>Follow us on social media to stay updated with the lates news, events, and happenings at Ridges International School</p>

        <div className='flex gap-4'>
            <Link href="/" className='p-3 bg-blue-500 text-white rounded-full'>
                <Facebook/>
            </Link>
            <Link href="/" className='p-3 bg-blue-500 text-white rounded-full'>
                <Instagram />
            </Link>
            <Link href='/' className='p-3 bg-blue-500 text-white rounded-full'>
                <Youtube />
            </Link>
        </div>
    </div>
  )
}

export default SocicalContact
