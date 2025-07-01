import React from 'react';
import Image from 'next/image';

const MiniStory = ({title, description, img, floatToLeft}:{title:string, description:string, img:string, floatToLeft:boolean}) => {
  return (
    <div className={`flex flex-col gap-4 mx-6 lg:mx-20 ${floatToLeft ? 'md:flex-row-reverse' : 'md:flex-row'}`} >

        {/* text container  */}
        <div className='flex flex-col gap-4 w-full md:w-1/2'>
            <h1 className="text-lg font-bold text-gray-900"> {title}</h1>
            <p className='text-gray-700'>
               {description}
            </p>
        </div>

        {/* image container  */}
        <div className='w-full md:w-1/2 bg-gray-500 h-64 rounded-md'>
            <Image 
                src={img} 
                alt="Ridges"
                width={400}
                height={200}
                className="w-full h-full object-cover rounded-md"
            />
        </div>
      
    </div>
  )
}

export default MiniStory
