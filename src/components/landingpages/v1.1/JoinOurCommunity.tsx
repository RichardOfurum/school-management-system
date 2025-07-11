import Link from 'next/link'
import React from 'react'

const JoinOurCommunity = () => {
  return (
    <div className='flex flex-col items-center justify-center bg-sky-950 text-white p-10 gap-4 pt-14 pb-14'>
        <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl lg:leading-tight">Ready to Join Our Community?</h1>
        <p className="max-w-2xl mx-auto mt-4 text-xl text-white text-center">Take the first step towards providing your child with an exceptional educational experience at Ridges International School</p>

        <div className='flex gap-4 items-center'>
            <Link href="/prospectus" className='font-light text-sm border-2 p-4 rounded-md'>Download Prospectus</Link>

            <Link href="/contact" className='font-normal text-sm'>Schedule a Visit</Link>
        </div>
    </div>
  )
}

export default JoinOurCommunity
