import React from 'react'
import Image from 'next/image'
import BigCalendar from '@/components/BigCalendar'
import Announcements from '@/components/Announcements'
import Link from 'next/link'
import Performance from '@/components/Performance'

const SingleStudentPage = () => {
  return (
    <div className='flex p-4 flex-col xl:flex-row gap-4'>
        {/* left  */}
        <div className='w-full xl:w-2/3'> 
            {/* top  */}
            <div className='flex flex-col lg:flex-row gap-4'>
                {/* user info card  */}
                <div className='bg-lamaSky py-6 px-4 rounded-md flex-1 flex gap-4'> 
                   <div className='w-1/3'>
                        <Image
                            alt=''
                            src='https://images.pexels.com/photos/2888150/pexels-photo-2888150.jpeg?auto=compress&cs=tinysrgb&w=1200'
                            width={144}
                            height={144}
                            className='w-36 h-36 rounded-full object-cover'
                        />
                   </div>
                   <div className='w-2/3 flex flex-col justify-between gap-4'>
                        <h1 className='text-xl font-semibold'>Mark Syder</h1>

                        <p className='text-sm text-gray-500'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        </p>
                        <div className='flex items-center justify-between gap-2 flex-wrap text-xs font-medium'>
                            <div className='w-full md:w-1/3 flex items-center gap-2 lg:w-full 2xl:w-1/3'>
                                <Image 
                                    src='/blood.png' 
                                    alt=''
                                    width={14}
                                    height={14}
                                />
                                <span>A+</span>
                            </div>
                            <div className='w-full md:w-1/3 flex items-center gap-2 lg:w-full 2xl:w-1/3'>
                                <Image 
                                    src='/date.png' 
                                    alt=''
                                    width={14}
                                    height={14}
                                />
                                <span>Jenuary 2025</span>
                            </div>
                            <div className='w-full md:w-1/3 flex items-center gap-2 lg:w-full 2xl:w-1/3'>
                                <Image 
                                    src='/mail.png' 
                                    alt=''
                                    width={14}
                                    height={14}
                                />
                                <span>user@gmail.com</span>
                            </div>
                            <div className='w-full md:w-1/3 flex items-center gap-2 lg:w-full 2xl:w-1/3'>
                                <Image 
                                    src='/phone.png' 
                                    alt=''
                                    width={14}
                                    height={14}
                                />
                                <span>+234 5876 2343</span>
                            </div>
                        </div>
                   </div>
                </div>

                {/* small cards  */}
                <div className='flex-1 flex gap-4 justify-around flex-wrap'>
                    {/* card  */}
                    <div className='w-full bg-white p-4 rounded-md flex gap-4 md:w-[%40] xl:w-[45%] 2xl:w-[48%] items-center'>
                        <Image 
                            src='/singleAttendance.png'
                            alt=''
                            width={24}
                            height={24}
                            className='w-6 h-6'
                        />
                        <div className=''>
                            <h1 className='text-xl font-semibold'>90%</h1>
                            <span className='text-sm text-gray-400'>Attendance</span>
                        </div>
                    </div>

                    {/* card  */}
                    <div className='w-full bg-white p-4 rounded-md flex gap-4 md:w-[%40] xl:w-[45%] 2xl:w-[48%] items-center'>
                        <Image 
                            src='/singleBranch.png'
                            alt=''
                            width={24}
                            height={24}
                            className='w-6 h-6'
                        />
                        <div className=''>
                            <h1 className='text-xl font-semibold'>6th</h1>
                            <span className='text-sm text-gray-400'>Grade</span>
                        </div>
                    </div>

                    {/* card  */}
                    <div className='w-full bg-white p-4 rounded-md flex gap-4 md:w-[%40] xl:w-[45%] 2xl:w-[48%] items-center'>
                        <Image 
                            src='/singleLesson.png'
                            alt=''
                            width={24}
                            height={24}
                            className='w-6 h-6'
                        />
                        <div className=''>
                            <h1 className='text-xl font-semibold'>18</h1>
                            <span className='text-sm text-gray-400'>Lessons</span>
                        </div>
                    </div>

                    

                    {/* card  */}
                    <div className='w-full bg-white p-4 rounded-md flex gap-4 md:w-[%40] xl:w-[45%] 2xl:w-[48%] items-center'>
                        <Image 
                            src='/singleClass.png'
                            alt=''
                            width={24}
                            height={24}
                            className='w-6 h-6'
                        />
                        <div className=''>
                            <h1 className='text-xl font-semibold'>6A</h1>
                            <span className='text-sm text-gray-400'>Class</span>
                        </div>
                    </div>
                    
                </div>
            </div>

            {/* bottom  */}
            <div className='mt-4 bg-white rounded-md p-4 h-[800px]'>
                <h1>Student&apos;s Schedule</h1>
                <BigCalendar/>
            </div>
        </div>

        {/* right  */}
        <div className='w-full xl:w-1/3 flex flex-col gap-4'>
            <div className='bg-white p-2 rounded-md'>
                <h1 className='text-xl font-semibold'>Shortcuts</h1>
                <div className='mt-4 flex gap-2 flex-wrap text-[10px] text-gray-500'>

                    {/* <Link href="/" className='p-3 rounded-md bg-lamaSkyLight'>Student&apos;s Classes</Link> */}

                    <Link href={`/dashboard/list/teachers?classId=${2}`} className='p-3 rounded-md bg-lamaPurpleLight'>
                        Student&apos;s Teachers
                    </Link>

                    <Link href={`/dashboard/list/exams/?classId=${2}`} className='p-3 rounded-md bg-pink-50'>
                        Student&apos;s Exams
                    </Link>

                    <Link href={`/dashboard/list/lessons/?classId=${2}`} className='p-3 rounded-md bg-lamaYellowLight'>
                        Student&apos;s Lessons
                    </Link>
                    <Link href={`/dashboard/list/results/?studentId=${"student2"}`} className='p-3 rounded-md bg-lamaYellowLight'>
                        Student&apos;s Results
                    </Link>
                    
                    <Link href={`/dashboard/list/assignments/?classId=${2}`} className='p-3 rounded-md bg-lamaPurpleLight'>
                        Student&apos;s Assignments
                    </Link>
                </div>
            </div>
            <Performance/>
            <Announcements/>
        </div>
    </div>
  )
}

export default SingleStudentPage