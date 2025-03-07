import TableSearch from '@/components/TableSearch'
import React from 'react';
import Image from 'next/image';
import Pagination from '@/components/Pagination';
import Table from '@/components/Table';
import prisma from '@/lib/prisma';
import { ITEM_PER_PAGE } from '@/lib/settings';
import { Class, Grade, Prisma } from '@prisma/client';
import { auth } from '@clerk/nextjs/server';
import FormContainer from '@/components/FormContainer';
import Link from 'next/link';

type GradeList = {
    id: number,
    level: string,
    _count: { students: number },
}


const renderRow = (item:GradeList, role:string | undefined) => (
  <tr key={item.id} className='border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight'>
    
    <td className='flex items-center gap-4 p-4 font-semibold'>
        {item.level}
    </td>
    
    <td className=''>{item?._count.students}</td>
   
    <td>
      <div className='flex items-center gap-2'>
        <Link href={`/dashboard/list/students/?grade=${item.id}`}>
            <button className='w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky'>
                <Image src="/view.png" alt="" width={16} height={16}/>
            </button>
        </Link>
            {
                role === "admin" && (
                  <>
                      <FormContainer table="grade" type="update" data={item} />
                      <FormContainer table="grade" type="delete" id={item.id} />
                  </>
                )
            }
      </div>
    </td>
  </tr>
);


const GradeListPage = async({
  searchParams
}:{
  searchParams:{[key:string]:string | undefined}
}) => {

    const {sessionClaims } = await auth();
    const role = (sessionClaims?.metadata as { role?: string })?.role;
    

    const columns = [
      {
          header:"Grade Level", 
          accessor:"level"
      },
      {
        header:"Number Of Students",  
        accessor:"students", 
      },
  
      ...(role === "admin" ? [{
        header:"Actions",  
        accessor:"actions",  
      }] : [])
  ];

  // console.log(searchParams);

  const {page, ...queryParams} = searchParams;
  const p = page ? parseInt(page) : 1;

  //URL PARAMS CONDITIONS

  const query: Prisma.ClassWhereInput = {}

  if(queryParams) {
    for(const [key, value] of Object.entries(queryParams)) {
      if(value !== undefined) {
        switch(key) {
            case "supervisorId":
              query.supervisorId = value
              break;
            case 'search':
              query.name = { contains: value}; 
              break;
            default:
              break;
        }
      }
    }
  }


  const [data, count] = await prisma.$transaction([
    prisma.grade.findMany({
        select: {
            id: true,
            level: true,
            _count: {
              select: {
                students: true, // Count number of students in each grade
              },
            },
          },
          orderBy: {
            level: "asc", // Order by createdAt in descending order (newest first)
          },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1)
  }),

   prisma.class.count({where:query})
  ])

  console.log(count);

  
  return (
    <div className='bg-white p-4 rounded-md flex-1 m-4 mt-0 flex flex-col justify-between'>
       <div>
           {/* top  */}
            <div className='md:flex items-center justify-between'>
                  <h1 className='text-lg font-semibold mb-4' >All Grades</h1>
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
                              role === "admin" && (
                                <FormContainer table="grade" type="create" />
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

export default GradeListPage