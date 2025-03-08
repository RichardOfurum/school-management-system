import { motion } from 'framer-motion';
import BigCard from './BigCard';

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

        <div className='flex flex-col lg:flex-row '>

            <div className='bg-red-50 h-10'>

                {/* <BigCard image="/hero.png" title="Athletics" description='Competitive sports programs that build teamwork, discipline, and character.'/> */}
            </div>
            
           <div>
                {/* <BigCard image="/hero.png" title="Clubs & Societies" description='Join local clubs, societies, and organizations to learn about various aspects of life.'/> */}
           </div>

        </div>
          
      </motion.div>
    </div>
  );
}