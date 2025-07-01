import SocicalContact from '@/components/landingpages/v1.0/SocicalContact';
import Footer from '@/components/landingpages/v1.1/Footer';
import Header from '@/components/landingpages/v1.1/Header';
import { PrismaClient } from '@prisma/client';
import Image from 'next/image';


const prisma = new PrismaClient();

interface SingleBlogPageProps {
  params: {
    id: string;
  };
}

export default async function SingleBlogPage({ params }: SingleBlogPageProps) {
  const blog: any = await prisma.post.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!blog) {
    return <div className="text-center py-12">Blog not found.</div>;
  }

  return (
    <>
        <Header/>
        <br />  <br /> <br /> 
       
        <div className="min-h-screen">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-shadow duration-300 hover:shadow-xl">
              <div className="relative h-96">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">{blog.title}</h1>
                <p className="text-gray-600 mb-6">{blog.description}</p>
                <div className="prose max-w-none">
                  <p>{blog.content}</p>
                </div>
                <p className="text-sm text-gray-500 mt-8">
                  Published on: {new Date(blog.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
        <SocicalContact/>
        <Footer/>
    </>
  );
}