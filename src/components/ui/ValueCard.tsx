import { CircleCheck } from 'lucide-react'
import React from 'react'

const ValueCard = ({title, description}:{title:string, description:string}) => {
  return (
    <div className='bg-white flex flex-col p-10 rounded-md '>
      {/* Icon and Title */}
      <span className='flex items-center gap-2 mb-4'>
        <CircleCheck className='text-blue-500 w-6 h-6' /> {/* Change color to blue */}
        <p className='text-lg font-semibold text-gray-800'>{title}</p>
      </span>

      {/* Description */}
      <p className='text-gray-600'>{description}</p>
    </div>
  )
}

export default ValueCard
