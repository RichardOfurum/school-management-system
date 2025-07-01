import { CircleCheck } from 'lucide-react'
import React from 'react'

const ValueCard = ({title, description}:{title:string, description:string}) => {
  return (
    <div className='bg-white flex flex-col p-10 rounded-md '>
      {/* Icon and Title */}
      <span className='flex items-center gap-2 mb-4'>
        <CircleCheck className='text-emerald-950 w-6 h-6' /> {/* Change color to blue */}
        <p className='text-2xl font-bold text-sky-950'>{title}</p>
      </span>

      {/* Description */}
      <p className='text-gray-600 font-mono text-sm'>{description}</p>
    </div>
  )
}

export default ValueCard
