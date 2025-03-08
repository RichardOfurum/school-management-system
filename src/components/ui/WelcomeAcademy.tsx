"use client"; // Ensure this component is client-side rendered

import { Award, BookOpen, Calendar, UsersRound } from "lucide-react";
import { motion } from "framer-motion";

const WelcomeAcademy = () => {
  // Animation variants for the grid items
  const gridItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  // Animation variants for the header
  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.2 } },
  };

  return (
    <div className="w-full bg-white flex justify-center items-center">
        <div className="h-[auto] bg-white py-6 px-6 sm:px-12 lg:px-24 my-10">
            {/* Header Section */}
            <motion.div
                variants={headerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-center mb-6"
            >
                <h1 className="sm:text-5xl font-bold text-gray-900 mb-4 text-2xl">
                    Welcome to Ridges International School
                </h1>
                <p className="text-lg sm:text-xl text-gray-700 font-extralight">
                A place where education meets innovation, and students are prepared not
                just for exams, but for life.
                </p>
            </motion.div>

            {/* Grid Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Academic Excellence */}
                <motion.div
                variants={gridItemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-blue-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                <div className="bg-white p-4 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <BookOpen className="text-blue-800 w-6 h-6" />
                </div>
                <h2 className="text-xl font-semibold text-blue-800 mb-4">
                    Academic Excellence
                </h2>
                <p className="text-gray-600 text-[14px]">
                    Rigorous curriculum designed to challenge and inspire students to
                    reach their full potential.
                </p>
                </motion.div>

                {/* Supportive Community */}
                <motion.div
                variants={gridItemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-blue-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                <div className="bg-white p-4 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <UsersRound className="text-blue-800 w-6 h-6" />
                </div>
                <h2 className="text-xl font-semibold text-purple-800 mb-4">
                    Supportive Community
                </h2>
                <p className="text-gray-600 text-[14px]">
                    A nurturing environment where every student feels valued, supported,
                    and encouraged.
                </p>
                </motion.div>

                {/* Character Development */}
                <motion.div
                variants={gridItemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-blue-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                <div className="bg-white p-4 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <Award className="text-blue-800 w-6 h-6" />
                </div>
                <h2 className="text-xl font-semibold text-green-800 mb-4">
                    Character Development
                </h2>
                <p className="text-gray-600 text-[14px]">
                    Focus on developing well-rounded individuals with strong values and
                    leadership skills.
                </p>
                </motion.div>

                {/* Enriching Activities */}
                <motion.div
                variants={gridItemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-blue-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                <div className="bg-white p-4 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <Calendar className="text-blue-800 w-6 h-6" />
                </div>
                <h2 className="text-xl font-semibold text-orange-800 mb-4">
                    Enriching Activities
                </h2>
                <p className="text-gray-600 text-[14px]">
                    Diverse extracurricular programs that foster creativity, teamwork, and
                    personal growth.
                </p>
                </motion.div>
            </div>
            </div>
    </div>
    
  );
};

export default WelcomeAcademy;