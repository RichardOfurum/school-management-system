import TableSearch from '@/components/TableSearch'
import React from 'react';
import Image from 'next/image';
import Pagination from '@/components/Pagination';
import Table from '@/components/Table';
import FormModal from '@/components/FormModal';
import prisma from '@/lib/prisma';
import { ITEM_PER_PAGE } from '@/lib/settings';
import { Announcement, Class, Prisma } from '@prisma/client';
import { auth } from '@clerk/nextjs/server';
import FormContainer from '@/components/FormContainer';

type AnnouncementList = Announcement & {class: Class}

const renderRow = (item:AnnouncementList, role: string | undefined) => (
  <tr key={item.id} className='border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight'>
    
    <td className='flex items-center gap-4 p-4 font-semibold'>
        {item.title}
    </td>
    <td className=''>{item.class?.name || "-"}</td> 
    <td className='hidden lg:table-cell'>
      {
          new Intl.DateTimeFormat("en-US").format(item.date)
      }  
    </td> 
 
    
    <td>
      <div className='flex items-center gap-2'>
      
            {
                role === "admin" && (
                  <>
                      <FormContainer table="announcement" type="update" data={item}/>
                      <FormContainer table="announcement" type="delete" id={item.id} />
                  </>
                  
                )
            }
        
      </div>
    </td>
  </tr>
);

const AnnouncementListPage = async({
  searchParams
}:{
  searchParams:{[key:string]:string | undefined}
}) => {

  const { userId, sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;
  const currentUserId = userId;

  const columns = [
    {
        header:"Title", 
        accessor:"title"
    },
    {
      header:"Class",   
      accessor:"class", 
    },
    {
      header:"Date",  
      accessor:"date", 
      className:"hidden lg:table-cell"
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

  const query: Prisma.AnnouncementWhereInput = {}

  if(queryParams) {
    for(const [key, value] of Object.entries(queryParams)) {
      if(value !== undefined) {
        switch(key) {
            case 'search':
              query.title = { contains: value}; 
              break;
              default:
              break;
        }
      }
    }
  };

   //ROLE CONDITIONS

   switch (role) {
    case "admin":
      break;
    case "teacher":
      query.OR = [
        {classId: null},
        {class: {lessons: {some:{teacherId: currentUserId!}}}},
      ];
      break;
    case "student":
      query.OR = [
        {classId: null},
        {class: {students: {some:{id: currentUserId!}}}},
      ];
      break;
    case "parent":
      query.OR = [
        {classId: null},
        {class: {students: {some:{parentId: currentUserId!}}}},
      ];
      break;
    default:
      break;
   }

  // const roleConditions = {
  //   teacher: {lessons:{some: {teacherId: currentUserId!}}},
  //   student:{ students: {some:{ id: currentUserId! }} },
  //   parent:{ students: {some:{ parentId: currentUserId! }} },
  // }

  //   query.OR = [
  //   {classId: null},
  //   {
  //     class: roleConditions[role as keyof typeof roleConditions] || {},
  //   }
  // ];



  // const [data, count] = await prisma.$transaction([
  //   prisma.announcement.findMany({
  //     where:query,
  //     include:{
  //       class:true,
  //     },
  //     take: ITEM_PER_PAGE,
  //     skip: ITEM_PER_PAGE * (p - 1)
  // }),

  //  prisma.announcement.count({where:query})
  // ]);
  const [data, count] = await prisma.$transaction([
    prisma.announcement.findMany({
      where: query,
      include: {
        class: true, // Include related class data
      },
      orderBy: {
        createdAt: "desc", // Order by createdAt in descending order (newest first)
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.announcement.count({ where: query }),
  ]);

  return (
    <div className='bg-white p-4 rounded-md flex-1 m-4 mt-0 flex flex-col justify-between'>
      <div>
              {/* top  */}
            <div className='md:flex  items-center justify-between '>

                  <h1 className='text-lg font-semibold mb-4' >All Announcement</h1>

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
                              role === "admin" && (
                                <FormContainer table="announcement" type="create" />
                              )
                          }
                      </div>
                  </div>
            </div>

              {/* list  */}
              <Table 
                columns={columns} 
                renderRow={(item) => renderRow(item, role)} 
                // renderRow={renderRow} 
                data={data}
              />

      </div>

        {/* pagination  */}
     
        <Pagination page={p} count={count}/>
      
    </div>
  )
}

export default AnnouncementListPage