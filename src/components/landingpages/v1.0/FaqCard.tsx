import React from 'react'

const FaqCard = ({question, answer}:{question:string, answer:string}) => {
  return (
    <div className='bg-gray-100 p-6 flex flex-col gap-3 rounded-md'>
        <h1 className='font-bold'>{question}</h1>
        <p className='text-sm text-gray-700'>{answer}</p>
    </div>
  )
}

export default FaqCard
