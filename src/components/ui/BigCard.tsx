import React from 'react'

const BigCard = ({title, description ,image}:{title:string, description:string, image:string}) => {
  return (
    <div>
        <div className="relative h-56 w-full bg-cover bg-center" style={{ backgroundImage: `url('${image}')` }}>

          <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-bottom from-white to-black" /></div>

        <div className="px-4 py-6 text-center">
          <h2 className="text-3xl font-bold">{title}</h2>
          <p>{description}</p>
        </div>
        
      </div>
    
  )
}

export default BigCard
