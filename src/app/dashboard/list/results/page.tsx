import TableSearch from '@/components/TableSearch'
import React from 'react';
import Image from 'next/image';
import Pagination from '@/components/Pagination';
import Table from '@/components/Table';
import Link from 'next/link';
import {assignmentsData, resultsData, role } from '@/lib/data';
import FormModal from '@/components/FormModal';

type Result = {
  id:number;
  subject:string;
  class:string;
  teacher:string;
  student:string;
  type:"exam" | "assignment" | "test" | "accessment";
  date:string;
  score:number;
}

const columns = [
    {
        header:"Sbject Name", 
        accessor:"subject"
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
        header:"Type",  
        accessor:"type", 
        className:"hidden xl:table-cell"
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


const ResultListPage = () => {

  const renderRow = (item:Result) => (
    <tr key={item.id} className='border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight'>
      
      <td className='flex items-center gap-4 p-4 font-semibold'>
          {item.subject}
      </td>
      <td className=''>{item.student}</td> 
      <td className=''>{item.score}</td> 
      <td className='hidden xl:table-cell'>{item.teacher}</td> 
      
      <td className='hidden md:table-cell'>{item.class}</td>
      <td className='hidden md:table-cell'>{item.type}</td> 
         
      <td className='hidden lg:table-cell'>{item.date}</td>    
 
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
                        <FormModal table="result" type="update" data={item} />
                        <FormModal table="result" type="delete" id={item.id} />
                    </>
                  )
              }
          
        </div>
      </td>
    </tr>
  );

  return (
    <div className='bg-white p-4 rounded-md flex-1 m-4 mt-0'>
        {/* top  */}
      <div className='flex items-center justify-between'>
            <h1 className='text-lg font-semibold hidden md:block' >All Results</h1>
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
                          <FormModal table="result" type="create" />
                        )
                    }
                </div>
            </div>
      </div>

        {/* list  */}
        <Table columns={columns} renderRow={renderRow} data={resultsData}/>

        {/* pagination  */}
     
        {/* <Pagination/> */}
      
    </div>
  )
}

export default ResultListPage