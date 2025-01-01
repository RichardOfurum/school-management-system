import Link from "next/link";

const Homepage = () => {
 
  return (
    <div className=''>
      <h1>Home Page</h1>
      <Link href={`/dashboard/admin`}>Dashboard</Link>
      <br />
      <Link href={`/sign-in`}>Sign In</Link>

    </div>
  )
}

export default Homepage