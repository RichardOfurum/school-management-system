import TableSearch from '@/components/TableSearch'
import React from 'react';
import Image from 'next/image';
import Pagination from '@/components/Pagination';
import Table from '@/components/Table';
import Link from 'next/link';
import {announcementsData, role } from '@/lib/data';
import FormModal from '@/components/FormModal';

type Announcement = {
  id:number;
  title:string;
  class:string[];
  date:string;
}

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
    {
      header:"Actions",  
      accessor:"actions",  
      // className:"hidden md:table-cell"
    }
];


const AnnouncementListPage = () => {

  const renderRow = (item:Announcement) => (
    <tr key={item.id} className='border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight'>
      
      <td className='flex items-center gap-4 p-4 font-semibold'>
          {item.title}
      </td>
      <td className=''>{item.class}</td> 
      <td className='hidden lg:table-cell'>{item.date}</td> 
   
      
      <td>
        <div className='flex items-center gap-2'>
          
            
           
              {
                  role === "admin" && (
                    <>
                        <FormModal table="announcement" type="update" data={item}/>
                        <FormModal table="announcement" type="delete" id={item.id} />
                    </>
                    
                  )
              }
          
        </div>
      </td>
    </tr>
  );

  return (
    <div className='bg-white p-4 rounded-md flex-1 m-4 mt-0 flex flex-col justify-between'>
      <div>
              {/* top  */}
            <div className='flex items-center justify-between'>
                  <h1 className='text-lg font-semibold hidden md:block' >All Announcement</h1>
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
                                <FormModal table="announcement" type="create" />
                              )
                          }
                      </div>
                  </div>
            </div>

              {/* list  */}
              <Table columns={columns} renderRow={renderRow} data={announcementsData}/>

      </div>

        {/* pagination  */}
     
        {/* <Pagination/> */}
      
    </div>
  )
}

export default AnnouncementListPage