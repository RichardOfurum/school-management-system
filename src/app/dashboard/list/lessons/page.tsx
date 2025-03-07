import TableSearch from '@/components/TableSearch'
import React from 'react';
import Image from 'next/image';
import Pagination from '@/components/Pagination';
import Table from '@/components/Table';
import FormModal from '@/components/FormModal';
import { Class, Lesson, Prisma, Subject, Teacher } from '@prisma/client';
import prisma from '@/lib/prisma';
import { ITEM_PER_PAGE } from '@/lib/settings';
import { auth } from '@clerk/nextjs/server';
import FormContainer from '@/components/FormContainer';

type LessonList = Lesson & {subject: Subject,} & {class: Class} & {teacher: Teacher}



const renderRow = (item:LessonList, role: string | undefined) => (
  <tr key={item.id} className='border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight'>
    
    <td className='flex  gap-4 p-4 flex-col justify-items-start'>
        <span className='font-semibold'>{item.subject.name}</span>
        <span className='font-thin'>{item.name}</span>
    </td>
    
    <td className=''>{item.class.name}</td>
    <td className='hidden md:table-cell'>{item.teacher.name + " " + item.teacher.surname}</td> 

    <td className='hidden md:table-cell font-semibold'>
        <span className=''>
            {new Intl.DateTimeFormat("en-GB", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: false, // Use 24-hour format
            }).format(new Date(item.startTime))}
          </span>
          <br /> <br />
        <span className=''>
            {new Intl.DateTimeFormat("en-GB", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: false, // Use 24-hour format
            }).format(new Date(item.endTime))}
          </span>
    </td>    

    <td>
      <div className='flex items-center gap-2'>
            
            {
                (role === "admin" || role === "teacher") && (
                  <>
                      <FormContainer table="lesson" type="update" data={item} />
                      <FormContainer table="lesson" type="delete" id={item.id} />
                  </>
                )
            }
        
      </div>
    </td>
  </tr>
);

const LessonListPage = async({
  searchParams
}:{
  searchParams:{[key:string]:string | undefined}
}) => {

  // console.log(searchParams);

  const {sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  const columns = [
    {
        header:"Sbject Name", 
        accessor:"subject"
    },
    {
      header:"Class",  
      accessor:"class", 
    },
    {
      header:"Teacher",  
      accessor:"teacher", 
      className:"hidden md:table-cell"
    },
    {
      header:"Date/Time",  
      accessor:"date/time", 
      className:"hidden md:table-cell"
    },
    ...((role === "admin" || role === "teacher") ? [{
      header:"Actions",  
      accessor:"actions",  
    }] : [])
];

  const {page, ...queryParams} = searchParams;
  const p = page ? parseInt(page) : 1;

  //URL PARAMS CONDITIONS

  const query: Prisma.LessonWhereInput = {}

  if(queryParams) {
    for(const [key, value] of Object.entries(queryParams)) {
      if(value !== undefined) {
        switch(key) {
            case "teacherId":
              query.teacherId = value;
              break;
            case "classId":
              query.classId = parseInt(value);
              break;
            case 'search':
              query.OR = [
                  {subject: {name:{contains: value}}},
                  {teacher: {name:{contains: value}}}
              ]
              break;
            default:
              break;
        }
      }
    }
  }


  const [data, count] = await prisma.$transaction([
    prisma.lesson.findMany({
      where:query,
      orderBy: {
        createdAt: "desc", // Order by createdAt in descending order (newest first)
      },
      include:{
        subject:{select:{name:true}},
        class:{select:{name:true}},
        teacher:{select:{name:true, surname:true}},
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1)
  }),

   prisma.lesson.count({where:query})
  ])
  
  return (
    <div className='bg-white p-4 rounded-md flex-1 m-4 mt-0 flex flex-col justify-between'>
       <div>

             {/* top  */}
            <div className='md:flex items-center justify-between'>
                  <h1 className='text-lg font-semibold mb-4' >All Lessons</h1>
                  <div className='flex flex-col md:flex-row items-center gap-4 w-full md:w-auto'>
                      <TableSearch/>
                      <div className='flex items-center gap-4 self-end'>
                          <button className='w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow'>
                              <Image src="/filter.png" alt="" height={14} width={14}/>
                          </button>
                          <button className='w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow'>
                              <Image src="/sort.png" alt="" height={14} width={14}/>
                          </button>
                          {
                              (role === "admin"|| role === "teacher") && (
                                <FormContainer table="lesson" type="create" />
                              )
                          }
                      </div>
                  </div>
            </div>

              {/* list  */}
              <Table columns={columns} renderRow={(item) => renderRow(item, role)} data={data}/>

       </div>

        {/* pagination  */}
     
        <Pagination page={p} count={count}/>
      
    </div>
  )
}

export default LessonListPage