import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar";


export const metadata: Metadata = {
  title: "Ridges International School",
  description: "A place where education meets innovation, and students are prepared not just for exams, but for life.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen flex">

        <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] overflow-y-scroll scrollbar-thin">
            <Link href="/" 
              className="flex items-center justify-center gap-2 lg:justify-start p-4"
            >
                <Image 
                    src="/logo.png"
                    height={30}
                    width={30}
                    alt="logo"
                    // className="h-10 mx-auto"
                    // objectFit="contain"
                />
                <span className="hidden lg:block font-bold">Ridges</span>
            </Link>
            <Menu/>       
        </div>

        <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] flex-1 bg-[#F7F8FA] overflow-y-scroll scrollbar-thin flex flex-col">
            <Navbar/>
            {children}
        </div>

    </div>
  );
}
