import { motion } from 'framer-motion';

export default function VibrantStudent() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-stone-100 p-8">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto text-center"
      >
        <h1 className="text-3xl font-bold text-stone-900 mb-8">Vibrant Student Life</h1>
        <p className="text-md text-stone-700 mb-12">At Horizon Academy, education extends beyond the classroom through a rich variety of extracurricular activities.</p>

        <div className='flex flex-col lg:flex-row gap-6'>

            <div className="relative bg-[url('/herobg.png')] bg-cover bg-center h-96 flex flex-col justify-end items-start text-white p-8 rounded-lg">
            
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent opacity-100 rounded-lg"></div>
          
                <p className='z-10 font-semibold text-2xl'>Athletics</p>
                <p className='z-10 text-left font-light'>Competitive sports programs that build teamwork, discipline, and character</p>
             
            </div>
            
            <div className="relative bg-[url('/hero.png')] bg-cover bg-center h-96 flex flex-col justify-end items-start text-white p-8 rounded-lg">
            
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent opacity-100 rounded-lg">

                </div>
            
                <p className='z-10 font-semibold text-2xl'>Clubs & Societies</p>
                <p className='z-10 text-left font-light'>
                  Join local clubs, societies, and organizations to learn about various aspects of life.
                </p>
                
            </div>

        </div>
          
      </motion.div>
    </div>
  );
}