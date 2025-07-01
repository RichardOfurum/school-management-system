// app/blog/page.tsx
import Link from 'next/link';
import Image from 'next/image';
import prisma from '@/lib/prisma';
import SocicalContact from '@/components/landingpages/v1.0/SocicalContact';
import Header from '@/components/landingpages/v1.1/Header';
import Footer from '@/components/landingpages/v1.1/Footer';

const ITEMS_PER_PAGE = 6; // Number of blogs per page

interface BlogListPageProps {
  searchParams: {
    page?: string;
  };
}

export default async function BlogListPage({ searchParams }: BlogListPageProps) {
  const page = parseInt(searchParams.page || '1');
  const skip = (page - 1) * ITEMS_PER_PAGE;

  const blogs = await prisma.post.findMany({
    skip,
    take: ITEMS_PER_PAGE,
    orderBy: { createdAt: 'desc' },
  });

  const totalBlogs = await prisma.post.count();
  const totalPages = Math.ceil(totalBlogs / ITEMS_PER_PAGE);

  return (
    <>
      <Header />
      <div className="min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="relative h-[300px] w-full bg-[url('/blog.jpg')] bg-cover bg-center my-6 mt-10 rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-neutral-800 opacity-70"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <h1 className="text-4xl font-bold text-white z-10">School Blog</h1>
            </div>
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <Link key={blog.id} href={`/blog/${blog.id}`}>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="relative h-48">
                    <Image
                      src={blog.image || ""}
                      alt={blog.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">{blog.title}</h2>
                    <p className="text-gray-600 mb-4 truncate">
                      {blog.description.slice(0, 100)}...
                    </p>
                    <p className="text-sm text-gray-500">
                      Published on: {new Date(blog.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-12">
            <nav className="flex space-x-4">
              {Array.from({ length: totalPages }, (_, i) => (
                <Link
                  key={i + 1}
                  href={`/blog?page=${i + 1}`}
                  className={`px-4 py-2 rounded-lg ${
                    page === i + 1
                      ? 'bg-sky-950 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {i + 1}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <br />
        <br />
        <SocicalContact />
        <Footer />
      </div>
    </>
  );
}
