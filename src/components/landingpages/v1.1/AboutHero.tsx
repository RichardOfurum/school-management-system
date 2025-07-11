import React from 'react';
import Header from './Header';
import Link from 'next/link';
import Image from 'next/image';

const AboutHero = () => {
  return (
    <div className="bg-white">
      
      <Header/>

      <section className="bg-[#FCF8F1] bg-opacity-30 py-10 sm:py-16 lg:py-24">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
             
              <h1 className="mt-4 text-4xl font-bold  text-emerald-950 lg:mt-8 sm:text-6xl xl:text-8xl ">About Ridges International School</h1>
              <p className="mt-4 text-base text-black lg:mt-8 sm:text-xl">At Ridges International School, we provide a nurturing environment where students discover their potential and develop the skills to succeed in an ever-changing world.</p>
              <br />

              <br />
              <Link href="/contact"  className="inline-flex items-center px-6 py-4 mt-8 font-semibold text-black transition-all duration-200 bg-yellow-300 rounded-full lg:mt-16 hover:bg-yellow-400 focus:bg-yellow-400" role="button">
                Contact us
                <svg className="w-6 h-6 ml-8 -mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </Link>

            </div>

            <div>
              <Image width={1000} height={1000} className="w-full" src="/hero-img.png" alt="" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutHero;