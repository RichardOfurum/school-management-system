import React from 'react'
import Image from 'next/image'

const Propriators = () => {
  return (
    <section className="py-10 bg-white sm:py-16 lg:py-24">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
            <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold leading-tight text-sky-950 sm:text-4xl lg:text-5xl lg:leading-tight">People who made it successful</h2>
                <p className="max-w-2xl mx-auto mt-4 text-xl text-gray-600">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis.</p>
            </div>

            <div className="grid grid-cols-1 gap-6 mt-8 sm:grid-cols-3 md:mt-16 lg:gap-x-12">
                <div>
                    <Image 
                    width={500}
                    height={500}
                    className="w-full" src="/p1.jpg" alt="" />
                    <p className='font-bold text-sky-950'>Dr Joy Amadi</p>
                    <span className='font-mono'>Manager</span>
                </div>

                <div>
                    <Image 
                        width={500}
                        height={500}
                        className="w-full" src="/p2.jpg" alt="" />
                    <p className='font-bold text-sky-950'>Dr Joy Amadi</p>
                    <span className='font-mono'>Manager</span>
                </div>

                <div>
                    <Image 
                        width={500}
                        height={500} 
                        className="w-full" src="/p3.jpg" alt="" />
                    <p className='font-bold text-sky-950'>Dr Joy Amadi</p>
                    <span className='font-mono'>Manager</span>
                </div>
            </div>

        </div>
    </section>

  )
}

export default Propriators
