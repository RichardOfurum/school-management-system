import React from 'react'
import { Clock2, Mail, MapPin, Phone, PhoneCall } from 'lucide-react'
const ContactCard = ({title, description, email, phone}:{title:string, description:string, email:string, phone:string}) => {
  return (
    <div className='bg-white rounded-md p-2 flex flex-col gap-2'>
        <h2 className='text-md font-semibold text-gray-800'>{title}</h2>
        <p className='text-sm text-gray-600'>{description}</p>
        <span className="text-blue-700 text-sm flex gap-2"><Mail className='text-[11px]'/> {email} </span>
        <span className="text-blue-700 text-sm flex gap-2"><Phone /> {phone} </span>
    </div>
  )
}

export default ContactCard
