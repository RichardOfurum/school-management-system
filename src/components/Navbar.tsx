import React from 'react';
import Image from 'next/image';
import { UserButton } from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs/server';

const Navbar = async() => {
    const user = await currentUser();
    // console.log(user);
  return (
    <div className="flex item center justify-between p-4">
        {/* SEARCHBAR */}
        {/* <div className="hidden md:flex items-center gap-2 rounded-full ring-[1.5px] ring-gray-300 px-2">
            <Image src="/search.png" width={14} height={14} alt=''/>
            <input type="text" placeholder='Search...' className="w-[200px] p-2 bg-transparent outline-none"/>
         </div> */}

        {/* ICONS AND USER */}
        <div className="flex items-center gap-6 justify-end w-full"> 
            {/* <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer">
                <Image src="/message.png" width={20} height={20} alt=''/>
            </div>
            <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer relative">
                <Image src="/announcement.png" width={20} height={20} alt=''/>
                <div className="absolute -top-3 -right-3 w-5 h-5 flex items-center justify-center bg-purple-500 text-white rounded-full text-xs">1</div>
            </div> */} 
            <div className="flex flex-col">
                <span className="text-xs leading-3 font-medium">{user?.firstName + " " + user?.lastName}</span>
                <span className="text-[10px] text-gray-500 text-right">{user?.publicMetadata.role as string}</span>
            </div>
            {/* <Image src="/avatar.png" width={36} height={36} alt='' className="rounded-full"/> */}
            <UserButton />
        </div>
    </div>
  )
}

export default Navbar
