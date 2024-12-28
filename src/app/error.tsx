"use client"
import React from 'react'

const error = () => {
  return (
    <div className='w-full bg-lamaSky flex items-center justify-center h-screen flex-col gap-10'>
        <h1 className='text-[50px] font-extrabold'>Error Loading the page.</h1>
        <p className='text-[20px] font-thin'>Please refresh the page</p>
    </div>
  )
}

export default error
