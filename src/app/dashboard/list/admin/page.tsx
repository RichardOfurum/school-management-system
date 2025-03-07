import TableSearch from '@/components/TableSearch'
import React from 'react';
import Image from 'next/image';
import Pagination from '@/components/Pagination';
import Table from '@/components/Table';
import prisma from '@/lib/prisma';
import { ITEM_PER_PAGE } from '@/lib/settings';
import { Prisma } from '@prisma/client';
import { auth } from '@clerk/nextjs/server';
import FormContainer from '@/components/FormContainer';
import { redirect } from 'next/navigation';

type AdminList = {
    id: number,
   username: string,
   firstName: string,
   surname: string,
}


const renderRow = (item:AdminList, role:string | undefined) => (
  <tr key={item.id} className='border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight'>
    
    <td className='flex items-center gap-4 p-4 font-semibold text-gray-800'>
        {item.firstName}
        <br />
        {item.surname}
    </td>

   <td>
      {item.username}
   </td>
    <td>
      <div className='flex items-center gap-2'>
        {/* <Link href={`/dashboard/list/students/?grade=${item.id}`}>
            <button className='w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky'>
                <Image src="/view.png" alt="" width={16} height={16}/>
            </button>
        </Link> */}
            {
                role === "admin" && (
                  <>
                      <FormContainer table="admin" type="update" data={item} />
                      <FormContainer table="admin" type="delete" id={item.id} />
                  </>
                )
            }
      </div>
    </td>
  </tr>
);


const AdminListPage = async({
  searchParams
}:{
  searchParams:{[key:string]:string | undefined}
}) => {

    

    const {sessionClaims } = await auth();
    const role = (sessionClaims?.metadata as { role?: string })?.role;
    

    // Redirect users without the "admin" role
    if (role !== "admin") {
        redirect('/dashboard/admin'); // Redirect to the dashboard or another appropriate page
    }
    const columns = [
      {
          header:"Name", 
          accessor:"name"
      },    
      {
        header:"Username", 
        accessor:"Username", 
        className:"hidden md:table-cell"
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
    prisma.admin.findMany({
       
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1)
  }),

   prisma.admin.count()
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
                          {/* <button className='w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow'>
                              <Image src="/filter.png" alt="" height={14} width={14}/>
                          </button>
                          <button className='w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow'>
                              <Image src="/sort.png" alt="" height={14} width={14}/>
                          </button> */}
                          {
                              role === "admin" && (
                                <FormContainer table="admin" type="create" />
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

export default AdminListPage