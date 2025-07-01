"use client"
import React from 'react';
import Image from 'next/image';

const AboutStory = () => {
  return (
    <section className="py-10 bg-white sm:py-16 lg:py-24">
        <div className="max-w-5xl px-4 mx-auto sm:px-6 lg:px-8">
            <div className="grid items-center md:grid-cols-2 gap-y-10 md:gap-x-20">
                <div className="pr-12 sm:pr-0">
                    <div className="relative max-w-xs mb-12">
                        <Image 
                        width={1000}
                        height={1000}
                        className="object-bottom rounded-md" src="/about-img2.jpg" alt="" />

                        <Image 
                        width={1000}
                        height={1000}
                        className="absolute origin-bottom-right scale-75 rounded-md -bottom-12 -right-12" src="/about-img1.jpg" alt="" />
                    </div>
                </div>

                <div>
                    <h2 className="text-3xl font-bold leading-tight text-sky-950 sm:text-4xl lg:text-5xl ">More About Us.</h2>
                    <p className="mt-4 text-base leading-relaxed text-gray-600">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.</p>

                    <p className="mt-4 text-base leading-relaxed text-gray-600">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.</p>
                </div>
            </div>
        </div>
    </section>

  )
}

export default AboutStory
