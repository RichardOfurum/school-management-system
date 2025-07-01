"use client"; // Ensure this component is client-side rendered

import { motion } from "framer-motion";
import Image from "next/image";

const Card = ({image, title, description}:{image:string, title:string, description:string}) => {
  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-auto bg-white flex items-center justify-center p-3">
      {/* Card Container */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 max-w-sm overflow-hidden"
      >
        {/* Image Section */}
        <div className="relative h-48 w-full">
          <Image
            src={image} // Replace with your image path
            alt="Elementary School"
            fill
            className="object-cover"
          />
        </div>

        {/* Content Section */}
        <div className="p-4">
          {/* Card Title */}
          <h2 className="text-1xl font-bold text-stone-800 mb-2">
            {title}
          </h2>

          {/* Card Description */}
          <p className="text-gray-600 mb-6 text-sm">
            {description}
          </p>

          {/* Learn More Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-blue-800 font-semibold hover:underline text-sm"
          >
            Learn More &gt;
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Card;