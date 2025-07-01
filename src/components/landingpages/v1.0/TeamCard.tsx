import React from 'react'
import Image from 'next/image'
const TeamCard = ({title, role, description, img}:{title:string, role:string | "" , description:string, img:string}) => {
  return (
    <div className='flex flex-col w-full bg-gray-50 rounded-md'>
        <Image 
            src={img}
            alt="img"
            width={500}
            height={500}
            className='w-full object-cover h-48 rounded-t-md'
        />
        <div className='flex flex-col gap-4 p-4'>
            <h1 className='font-semibold'>{title}</h1>
            <span className='text-xs text-blue-700'>{role}</span>
            <p className='text-sm text-gray-700'>{description}</p>
        </div>
    </div>
  )
}

export default TeamCard
