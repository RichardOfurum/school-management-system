import TableSearch from '@/components/TableSearch'
import React from 'react';
import Image from 'next/image';
import Pagination from '@/components/Pagination';
import Table from '@/components/Table';
import Link from 'next/link';
import { role } from '@/lib/data';
import { Prisma, Prospectus } from '@prisma/client';
import prisma from '@/lib/prisma';
import { ITEM_PER_PAGE } from '@/lib/settings';
import FormContainer from '@/components/FormContainer';

type ProspectusList = Prospectus;

const columns = [

    {
      header:"Title", 
      accessor:"title", 
      className:""
    },

    {
      header:"Actions",  
      accessor:"actions",  
      // className:"hidden md:table-cell"
    }
];

const renderRow = (item:ProspectusList) => (
  <tr key={item.id} className='border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight'>
    <td className='flex items-center gap-4 p-4'>
        {item.title} 
    </td>


    <td>
      <div className='flex items-center gap-2'>
        {/* <Link href={`/dashboard/list/post/${item.id}`}>
            <button className='w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky'>
                <Image src="/view.png" alt="" width={16} height={16}/>
            </button>
        </Link>  */}
            {
                role === "admin" && (
                  <>
                        <FormContainer table="prospectus" type="update" data={item} />
                        <FormContainer table="prospectus" type="delete" id={item.id} />
                  </>
                )
            }
        
      </div>
    </td>
  </tr>
);

const ProspectusList = async({
  searchParams
}:{
  searchParams:{[key:string]:string | undefined}
}) => {

  // console.log(searchParams);

  const {page, ...queryParams} = searchParams;
  const p = page ? parseInt(page) : 1;

  //URL PARAMS CONDITIONS

  const query: Prisma.ProspectusWhereInput = {}

  if(queryParams) {
    for(const [key, value] of Object.entries(queryParams)) {
      if(value !== undefined) {
        switch(key) {
        
            case 'search':
              query.title = { contains: value}; 
              break;
            case "grade": // Handle filtering by gradeId
             
            default:
                break;
        }
      }
    }
  }


  const [data, count] = await prisma.$transaction([
    prisma.prospectus.findMany({
        
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1)
  }),

   prisma.prospectus.count({where:query})
  ])

  console.log(count);

  return (
    <div className='bg-white p-4 rounded-md flex-1 m-4 mt-0 flex flex-col justify-between'>
       <div>
             {/* top  */}
            <div className='md:flex items-center justify-between'>
                  <h1 className='text-lg font-semibold mb-4' >School Prospectus</h1>
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
                                count === 0 && (
                                    <FormContainer table="prospectus" type="create" />
                                )
                              )
                          }
                      </div>
                  </div>
            </div>

              {/* list  */}
              <Table columns={columns} renderRow={renderRow} data={data}/>
       </div>

        {/* pagination  */}
     
        <Pagination page={p} count={count}/>
      
    </div>
  )
}

export default ProspectusList