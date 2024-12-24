"use client"
import Image from 'next/image'
import { useRouter } from 'next/navigation'
const TableSearch = () => {

  const router = useRouter();

  const pageNumber = 1;

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = (e.currentTarget[0] as HTMLInputElement).value;
    const params = new URLSearchParams(window.location.search);
      params.set('search', value.toString() );
      params.set('page', pageNumber.toString() );
      router.push(`${window.location.pathname}?${params}`); 
    // const searchQuery = e.target.elements[0].value;
    // router.push(`/dashboard/students?search=${searchQuery}`);
  }
  return (
    <form 
    onSubmit={handleSubmit}
    className="w-full md:w-auto flex items-center gap-2 rounded-full ring-[1.5px] ring-gray-300 px-2">
      <Image src="/search.png" width={14} height={14} alt=''/>
      <input type="text" placeholder='Search...' className="w-[200px] p-2 bg-transparent outline-none"/>
    </form>
  )
}

export default TableSearch
