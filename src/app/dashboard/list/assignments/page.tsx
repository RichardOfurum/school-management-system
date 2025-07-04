import TableSearch from '@/components/TableSearch'
import React from 'react';
import Image from 'next/image';
import Pagination from '@/components/Pagination';
import Table from '@/components/Table';
import prisma from '@/lib/prisma';
import { ITEM_PER_PAGE } from '@/lib/settings';
import { Assignment, Class, Prisma, Subject, Teacher } from '@prisma/client';
import { auth } from '@clerk/nextjs/server';
import FormContainer from '@/components/FormContainer';

type AssignmentList = Assignment & {
  lesson:{
    subject: Subject;
    class: Class;
    teacher: Teacher;
  }
} 


const renderRow = (item:AssignmentList, role: string | undefined) => (
  <tr key={item.id} className='border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight'>
    
    <td className='p-4'>
        <span className='font-semibold'> {item.lesson.subject.name} </span>
        <br />
        <span className='font-extralight'>{item.title}</span>
    </td>
    
    <td className=''>{item.lesson.class.name}</td>
    <td className='hidden md:table-cell'>{item.lesson.teacher.name + " " + item.lesson.teacher.surname }</td>    
    <td className='hidden md:table-cell'>{new Intl.DateTimeFormat("en-ng").format(item.dueDate)}</td>    

    <td>
      <div className='flex items-center gap-2'>
       
            {
                (role === "admin" || role === "teacher") && (
                  <>
                      <FormContainer table="assignment" type="update" data={item} />
                      <FormContainer table="assignment" type="delete" id={item.id} />
                  </>
                  
                )
            }
        
      </div>
    </td>
  </tr>
);

const AssignmentListPage = async({
  searchParams
}:{
  searchParams:{[key:string]:string | undefined}
}) => {

  // console.log(searchParams);

  const {userId, sessionClaims} = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;
  const currentUserId = userId;

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
      header:"Due Date",  
      accessor:"dueDate", 
      className:"hidden md:table-cell"
    },
    ...(role === "admin" || role === "teacher" ? [{
      header:"Actions",  
      accessor:"actions",  
    }] : [])
];

  const {page, ...queryParams} = searchParams;
  const p = page ? parseInt(page) : 1;

  //URL PARAMS CONDITIONS

  const query: Prisma.AssignmentWhereInput = {}

  query.lesson = {}

  if(queryParams) {
    for(const [key, value] of Object.entries(queryParams)) {
      if(value !== undefined) {
        switch(key) {
            case "classId":
              query.lesson.classId = parseInt(value);
              break;
            case "teacherId":
              query.lesson.teacherId = value;;
              break;
            
            case 'search':
              query.lesson.subject = {
                name:{contains:value}
              }
              break;
            default:
              break;
        }
      }
    }
  }

  //ROLE CONDITIONS
  switch(role){
    case "admin":
      break;
    case "teacher":
      // query.lesson = {teacherId: currentUserId};
      query.lesson.teacherId = currentUserId!;
      break;
    case "student":
      query.lesson.class={
        students:{
          some:{
            id:currentUserId!,
          }
        }
      }
      break;
    case "parent":
      query.lesson.class={
        students:{
          some:{
            parentId:currentUserId!,
          }
        }
      }
      break;
    default:
      break;
  }


  const [data, count] = await prisma.$transaction([
    prisma.assignment.findMany({
      where:query,
      include:{
        lesson:{
          select:{
            subject:{select: {name: true}},
            teacher:{select: {name: true, surname: true}},
            class: {select: {name: true}}
          }
        }
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1)
  }),

   prisma.assignment.count({where:query})
  ])
  

  // console.dir(data);
  return (
    <div className='bg-white p-4 rounded-md flex-1 m-4 mt-0 flex flex-col justify-between'>
      <div>
            {/* top  */}
            <div className='md:flex items-center justify-between'>
                  <h1 className='text-lg font-semibold mb-4' >All Assignments</h1>
                  <div className='flex flex-col md:flex-row items-center gap-4 w-full md:w-auto'>
                      <TableSearch/>
                      <div className='flex items-center gap-4 self-end'>
                          {/* <button className='w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow'>
                              <Image src="/filter.png" alt="" height={14} width={14}/>
                          </button>
                          <button className='w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow'>
                              <Image src="/sort.png" alt="" height={14} width={14}/>
                          </button> */}
                          
                          {
                              (role === "admin" || role === "teacher") && (
                                <FormContainer table="assignment" type="create" />
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

export default AssignmentListPage