import TableSearch from '@/components/TableSearch'
import React from 'react';
import Image from 'next/image';
import Pagination from '@/components/Pagination';
import Table from '@/components/Table';
import FormModal from '@/components/FormModal';
import prisma from '@/lib/prisma';
import { ITEM_PER_PAGE } from '@/lib/settings';
import { Prisma } from '@prisma/client';
import { auth } from '@clerk/nextjs/server';
import FormContainer from '@/components/FormContainer';

type ResultList = {
  id: number,
  title: string,
  studentName: string,
  studentSurname: string,
  teacherName: string,
  teacherSurname: string,
  score: number,
  className: string,
  startTime: Date,
}

const renderRow = (item:ResultList, role:string | undefined) => (
  <tr key={item.id} className='border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight'>
    
    <td className='flex items-center gap-4 p-4 font-semibold'>
        {item.title}
    </td>

    <td className=''>
      {item.studentName + " " + item.studentSurname}
    </td> 

    <td className=''>{item.score}</td> 
    <td className='hidden xl:table-cell'>{item.teacherName + " " + item.teacherSurname}</td> 
    
    <td className='hidden md:table-cell'>{item.className}</td>
    {/* <td className='hidden md:table-cell'>{item.type}</td>  */}
       
    <td className='hidden lg:table-cell'>{new Intl.DateTimeFormat("en-US").format(item.startTime)}</td>    

    <td>
      <div className='flex items-center gap-2'>
        {/* <Link href={`/dashboard/list/results/${item.id}`}>
            <button className='w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky'>
                <Image src="/edit.png" alt="" width={16} height={16}/>
            </button>
        </Link>  */}
            {
                role === "admin" && (
                  <>
                      <FormContainer table="result" type="update" data={item} />
                      <FormContainer table="result" type="delete" id={item.id} />
                  </>
                )
            }
        
      </div>
    </td>
  </tr>
);


const ResultListPage = async({
  searchParams
}:{
  searchParams:{[key:string]:string | undefined}
}) => {

  // console.log(searchParams);

    const { userId, sessionClaims } = await auth();
    const role = (sessionClaims?.metadata as { role?: string })?.role;
    const currentUserId = userId;

    const columns = [
      {
          header:"Title", 
          accessor:"title"
      },
      {
        header:"Student",   
        accessor:"student", 
      },
  
      {
          header:"Score",  
          accessor:"score", 
      },
      {
        header:"Teacher",  
        accessor:"teacher", 
        className:"hidden xl:table-cell"
      },
      {
          header:"Class",
          accessor:"class", 
          className:"hidden md:table-cell"
      },
   
      {
        header:"Date",  
        accessor:"date", 
        className:"hidden lg:table-cell"
      },
      ...(role === "admin" || role === "teacher" ? [{
        header:"Actions",  
        accessor:"actions",  
      }] : [])
  ];

  const {page, ...queryParams} = searchParams;
  const p = page ? parseInt(page) : 1;

  //URL PARAMS CONDITIONS

  const query: Prisma.ResultWhereInput = {}

  if(queryParams) {
    for(const [key, value] of Object.entries(queryParams)) {
      if(value !== undefined) {
        switch(key) {
            case "studentId":
              query.studentId = value;
              break;
            
            case 'search':
              query.OR = [
                  {exam:{title: {contains: value}}},
                  {assignment:{title: {contains: value}}},
                  {student: {name:{contains: value}}},
              ]
              break;
            default:
              break;
        }
      }
    }
  }

    // ROLE CONDITIONS

    switch (role) {
      case "admin":
        break;
      case "teacher":
        query.OR = [
          { exam: { lesson: { teacherId: currentUserId! } } },
          { assignment: { lesson: { teacherId: currentUserId! } } },
        ];
        break;
  
      case "student":
        query.studentId = currentUserId!;
        break;
  
      case "parent":
        query.student = {
          parentId: currentUserId!,
        };
        break;
      default:
        break;
    }

  

  const [dataRes, count] = await prisma.$transaction([
    prisma.result.findMany({
      where:query,
      orderBy: {
        createdAt: "desc", // Order by createdAt in descending order (newest first)
      },
      include:{
        student: {select:{name:true, surname:true}},
        exam:{
          include:{
            lesson:{
              select:{
                teacher:{select: {name: true, surname:true}},
                class: {select: {name: true}}
              }
            }
          }
        },
        assignment:{
          include:{
            lesson:{
              select:{
                teacher:{select: {name: true, surname:true}},
                class: {select: {name: true}}
              }
            }
          }
        }
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1)
  }),

   prisma.result.count({where:query})
  ]);

  const data = dataRes.map((item) =>{
    const assessment = item.exam || item.assignment;

    if(!assessment) return null;

    const isExam = "startTime" in assessment

    return{
      id: item.id,
      title: assessment.title,
      studentName: item.student.name,
      studentSurname: item.student.surname,
      teacherName: assessment.lesson.teacher.name,
      teacherSurname: assessment.lesson.teacher.surname,
      score: item.score,
      className: assessment.lesson.class.name,
      startTime: isExam ? assessment.startTime : assessment.startDate,
    }
  });
  

  return (
    <div className='bg-white p-4 rounded-md flex-1 m-4 mt-0 flex flex-col justify-between'>
        <div>
                 {/* top  */}
              <div className='md:flex items-center justify-between'>
                    <h1 className='text-lg font-semibold mb-4' >All Results</h1>
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
                                  <FormContainer table="result" type="create" />
                                )
                            }
                        </div>
                    </div>
              </div>

                {/* list  */}
                <Table columns={columns} renderRow={(item) => renderRow(item, role)}  data={data}/>
        </div>

        {/* pagination  */}
     
        <Pagination page={p} count={count}/>
      
    </div>
  )
}

export default ResultListPage