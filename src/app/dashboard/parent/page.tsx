import Announcements from '@/components/Announcements'
import BigCalendar from '@/components/BigCalendar'
import React from 'react';
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import BigCalendarContainer from '@/components/BigCalendarContainer';
import Link from 'next/link';

const ParentPage = async() => {
  const { userId } = await auth();
  const currentUserId = userId;
  
  const students = await prisma.student.findMany({
    where: {
      parentId: currentUserId!,
    },
  });
  return (
    <div className="p-4 gap-4 flex flex-col xl:flex-row flex-1">
      {/* LEFT  */}
      <div className="w-full flex flex-col gap-4">
        {students.map((student) => (
          <div className="w-full" key={student.id}>
            <div className="h-full bg-white p-4 rounded-md">
              <h1 className="text-xl font-semibold">

                Schedule <Link href={`/dashboard/list/students/${student.id}`}>({student.name + " " + student.surname})</Link> 
              </h1>
              <BigCalendarContainer type="classId" id={student.classId} />
            </div>
          </div>
        ))}
      </div>
      {/* RIGHT  */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8 ">
          {/* <EventCalendar/> */}
          <Announcements/>
      </div>
    </div>
  )
}

export default ParentPage
