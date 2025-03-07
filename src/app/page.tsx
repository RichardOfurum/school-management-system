"use client";
import Image from "next/image";
import { motion } from "framer-motion"; // For animations
import WelcomeAcademy from "@/components/ui/WelcomeAcademy";
import Header from "@/components/ui/Header";
import Link from "next/link";
import Story from "@/components/ui/Story";
import AcademicExcellence from "@/components/ui/AcademicExcellence";
import VibrantStudent from "@/components/ui/VibrantStudent";

const Homepage = () => {
  return (
    <>
        <Header/>
        <div className="w-full bg-white">
          {/* Hero Section */}
          <div className="relative h-screen w-full bg-[url('/herobg.png')] bg-cover bg-center">
          
            {/* Overlay */}
            <div className="absolute inset-0 bg-neutral-800 opacity-90"></div>

            {/* Content Container */}
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center h-full text-white px-6 lg:px-12 mt-11">
              {/* Left Section */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center lg:text-left max-w-2xl lg:mr-16"
              >
                <h1 className="text-5xl lg:text-6xl font-bold mb-6">
                  Redgis International School
                </h1>
                <div className="space-y-2 mb-8">
                  <h2 className="text-3xl lg:text-4xl font-semibold text-yellow-400">
                    Empowering Minds
                  </h2>
                  <h2 className="text-3xl lg:text-4xl font-semibold text-yellow-400">
                    Inspiring Futures
                  </h2>
                </div>
                <p className="text-lg lg:text-xl mb-8 leading-relaxed">
                  At Regis International School, we provide a nurturing environment
                  where students discover their potential and develop the skills to
                  succeed in an ever-changing world.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/prospectus" className="bg-yellow-400 text-neutral-900 font-semibold py-3 px-6 rounded-lg hover:bg-yellow-500 transition duration-300">
                    View Prospectus
                  </Link>
                  <Link href="/contact" className="bg-transparent border-2 border-yellow-400 text-yellow-400 font-semibold py-3 px-6 rounded-lg hover:bg-yellow-400 hover:text-neutral-900 transition duration-300">
                    Contact Us
                  </Link>
                </div>
              </motion.div>

              {/* Right Section */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="hidden lg:block h-[400px]"
              >
                <Image
                  src="/hero.png"
                  height={400}
                  width={400}
                  alt="Students at Regis International School"
                  className="rounded-lg shadow-2xl"
                />
              </motion.div>
            </div>
          </div>

          {/* WelcomeAcademy Section */}
     
            <WelcomeAcademy />

            <div className="w-full p-4 flex md:p-10  lg:p-20 items-center justify-center">
            <Story/>
            </div>

            <AcademicExcellence />

            <VibrantStudent/>
        </div>
    </>
  );
};

export default Homepage;