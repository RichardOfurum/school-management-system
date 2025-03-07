"use client"; // Ensure this component is client-side rendered

import { motion } from "framer-motion";
import Card from "./Card";
import Link from "next/link";

const AcademicExcellence = () => {
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
    <div className="min-h-screen bg-white py-12 px-6 sm:px-12 lg:px-24">
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
          className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2 text-center"
        >
          Academic Excellence
        </motion.h1>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-md sm:text-md text-gray-700 mb-6 text-center"
        >
          Our comprehensive academic programs are designed to challenge, inspire,
          and prepare students for future success.
        </motion.p>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Elementary School */}
          <Card 
            image="/hero.png" 
            title="Elementary School"
            description="Building a strong foundation through engaging, hands-on learning
            experiences that foster curiosity and creativity."
            />

          {/* Middle School */}
          <Card 
            image="/hero.png"
            title="middle School"
            description="Emphasizing critical thinking, problem-solving, and critical thinking skills
            to prepare students for success in high school."
            />

          {/* High School */}
          <Card 
            image="/hero.png"
            title="highSchool"
            description="Expanding upon the skills learned in elementary and middle school to prepare students for success in college and beyond."
            />
        </div>

        {/* View All Programs Button */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center mt-6 mb-6"
        >
          {/* <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300"
          > */}
            <Link href="/" className="font-semibold">View All Academic Programs</Link>
          {/* </motion.button> */}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AcademicExcellence;