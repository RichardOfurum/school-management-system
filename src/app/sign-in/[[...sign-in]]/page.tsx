'use client'

import * as Clerk from '@clerk/elements/common'
import * as SignIn from '@clerk/elements/sign-in'
import { useUser } from '@clerk/nextjs';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
// import { useUser } from '@clerk/nextjs';
// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';


const SingInPage = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const {isLoaded, isSignedIn, user} = useUser();

    const router = useRouter();

    useEffect(() =>{
        const role = user?.publicMetadata.role;
        if(role){
            router.push(`/dashboard/${role}`)
        }
    },[user, router]);
    
    useEffect(() =>{
        setTimeout(() =>{
            setLoading(false);
        },5000);
    },[loading]);
  return (
    <div className='h-screen flex items-center justify-center bg-lamaSkyLight'>
        <SignIn.Root>
            <SignIn.Step name='start' className="bg-white p-12 rounded-md shadow-2xl flex flex-col gap-2">
                
                <h1 className='text-xl font-bold flex items-center gap-2'>
                    <Image src="/logo.png" alt="" width={24} height={24}/> School name
                </h1>
                <h2 className='text-gray-500'>Sign in to your account</h2>

                <Clerk.GlobalError className='text-sm text-red-400'/>
                <Clerk.Field name="identifier" className='flex flex-col gap-2'>
                    <Clerk.Label className='text-xs text-gray-500'>Username</Clerk.Label>
                    <Clerk.Input type="text" required className='p-2 rounded-md ring-1 ring-gray-500 outline-none'/>
                    <Clerk.FieldError className='text-sm text-red-400'/>
                </Clerk.Field >
                <Clerk.Field name="password" className='flex flex-col gap-2'>
                    <Clerk.Label className='text-xs text-gray-500'>Password</Clerk.Label>
                    <Clerk.Input type="password" required className='p-2 rounded-md ring-1 ring-gray-500 outline-none'/>
                    <Clerk.FieldError className='text-sm text-red-400'/>
                </Clerk.Field>
                <SignIn.Action submit className={`${loading ? 'bg-blue-300' : 'bg-blue-500'} text-white my-1 rounded-md text-sm p-[10px] font-bold`} onClick={() => setLoading(true)} >
                    {
                        loading 
                        ? <span>Please wait...</span> 
                        : <span>Sign in</span> 
                    }
                </SignIn.Action>
            </SignIn.Step>
        </SignIn.Root>
    </div>
  )
}

export default SingInPage
