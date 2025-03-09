"use client"; // Ensure this component is client-side rendered

import { motion } from "framer-motion";
import Image from "next/image";

const Story = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, // Stagger animations for children
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen bg-stone-50 py-6 px-6 sm:px-12 lg:px-24 rounded-md">
      {/* Container with animations */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto"
      >
        {/* Title */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl font-bold text-gray-900 mb-8 text-center"
        >
          Our Story
        </motion.h1>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Section: Image Content */}
          <motion.div variants={itemVariants} className="relative h-96">
            <Image
              src="/herobg.png"
              alt="Ridges"
              fill
              className="rounded-lg object-cover shadow-lg"
            />
          </motion.div>


          {/* Right Section:Text Content */}
          <motion.div variants={itemVariants} className="space-y-6">
            <p className="text-md sm:text-md text-gray-700">
              Founded in 1985, Horizon Academy has a rich history of academic
              excellence and community engagement. What started as a small school
              with just 50 students has grown into a premier educational
              institution serving over 1,200 students from diverse backgrounds.
            </p>
            <p className="text-md sm:text-md text-gray-700">
              Our campus spans 15 acres of beautifully landscaped grounds,
              featuring state-of-the-art facilities designed to enhance the
              learning experience and foster a sense of community.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300"
            >
              Learn More About Us →
            </motion.button>
          </motion.div>

          
          
        </div>
      </motion.div>
    </div>
  );
};

export default Story;