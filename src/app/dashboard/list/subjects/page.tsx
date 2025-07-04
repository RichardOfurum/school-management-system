import TableSearch from '@/components/TableSearch'
import React from 'react';
import Image from 'next/image';
import Pagination from '@/components/Pagination';
import Table from '@/components/Table';
import FormModal from '@/components/FormModal';
import { Prisma, Subject, Teacher } from '@prisma/client';
import prisma from '@/lib/prisma';
import { ITEM_PER_PAGE } from '@/lib/settings';
import { auth } from '@clerk/nextjs/server';
import FormContainer from '@/components/FormContainer';

type SubjectList = Subject & {teachers: Teacher[]} 

const renderRow = (item:SubjectList, role:string | undefined) => (
  
  <tr key={item.id} className='border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight'>
    <td className='flex items-center gap-4 p-4 font-semibold'>
        {item.name}
    </td>
    
    <td className='hidden md:table-cell'>{item.teachers.map(teacher=>teacher.name).join(",")}</td>
   
    <td>
      <div className='flex items-center gap-2'>
        
            {
                role === "admin" && (
                  <>
                      <FormContainer table="subject" type="update" data={item} />
                      <FormContainer table="subject" type="delete" id={item.id} />
                      {/* <FormModal table="subject" type="update" data={item} />
                      <FormModal table="subject" type="delete" id={item.id} /> */}
                  </>
                )
            }
        
      </div>
    </td>
  </tr>
);

const ParentListPage = async({
  searchParams
}:{
  searchParams:{[key:string]:string | undefined}
}) => {

  // console.log(searchParams);

    const {sessionClaims } = await auth();
    const role = (sessionClaims?.metadata as { role?: string })?.role;

  const columns = [
    {
        header:"Subject Name", 
        accessor:"name"
    },
    {
      header:"Teachers", 
      accessor:"teachers", 
      className:"hidden md:table-cell"
    },

    ...(role === "admin" ? [{
      header:"Actions",  
      accessor:"actions",  
    }] : [])
];

  const {page, ...queryParams} = searchParams;
  const p = page ? parseInt(page) : 1;

  //URL PARAMS CONDITIONS

  const query: Prisma.SubjectWhereInput = {}

  if(queryParams) {
    for(const [key, value] of Object.entries(queryParams)) {
      if(value !== undefined) {
        switch(key) {
            case 'search':
              query.name = { contains: value}; 
              break;
            default:
              break;
            
              case "teacherId":
                query.teachers = { // Use the correct field name `lessons`
                  some: {
                    id: value, // Filter by `teacherId` in the `lessons` relation
                  },
                };
                break;
        }
      }
    }
  }


  const [data, count] = await prisma.$transaction([
    prisma.subject.findMany({
      where:query,
      include:{
        // subjects:true,
        teachers:true,
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1)
  }),

   prisma.subject.count({where:query})
  ])

  console.log(count);

  return (
    <div className='bg-white p-4 rounded-md flex-1 m-4 mt-0 flex flex-col justify-between'>
       <div>
           {/* top  */}
            <div className='md:flex items-center justify-between'>
                  <h1 className='text-lg font-semibold  mb-4' >All Subjects</h1>
                  <div className='flex flex-col md:flex-row items-center gap-4 w-full md:w-auto'>
                      <TableSearch/>
                      <div className='flex items-center gap-4 self-end'>
                          {/* <button className='w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow'>
                              <Image src="/filter.png" alt="" height={14} width={14}/>
                          </button>
                          <button className='w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow'>
                              <Image src="/sort.png" alt="" height={14} width={14}/>
                          </button> */}
                          {role === "admin" && (
                            <FormContainer table="subject" type="create" />
                          )}
                      </div>
                  </div>
            </div>

              {/* list  */}
              <Table 
                  columns={columns} 
                  renderRow={(item) => renderRow(item, role)} data={data}
              />
       </div>

        {/* pagination  */}
     
        <Pagination page={p} count={count}/>
      
    </div>
  )
}

export default ParentListPage