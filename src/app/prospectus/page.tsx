

// "use client"
// import Footer from '@/components/ui/Footer'
// import Header from '@/components/ui/Header'
// import SocicalContact from '@/components/ui/SocicalContact'
// import { fetchProspectus } from '@/lib/actions'
// import { Download } from 'lucide-react'
// import React, { useEffect, useState } from 'react'
// import { toast } from 'react-toastify'
// import { saveAs } from 'file-saver'; // Import file-saver

// const ProspectusPage = () => {
//   const [pdf, setPdf] = useState<string>();
//   const [isLoading, setIsLoading] = useState<boolean>(false);

//   const getProspectus = async () => {
//     setIsLoading(true);
//     try {
//       const existingPdf = await fetchProspectus();
//       setPdf(existingPdf[0]?.file || "");
//     } catch (error) {
//       toast.error("Failed to fetch prospectus, please try again!");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleDownload = () => {
//     if (pdf) {
//       // Use file-saver to trigger the download
//       saveAs(pdf, "prospectus.pdf"); // The second argument is the filename
//     } else {
//       toast.error("No prospectus found to download.");
//     }
//   };

//   useEffect(() => {
//     if (pdf?.length) {
//       toast("No prospectus found, please try again!");
//     }
//   }, [pdf]);

//   return (
//     <>
//       <Header />
//       <div className="w-full bg-white flex flex-col">
//         <div className='bg-blue-700 w-full flex flex-col gap-6 text-white items-center justify-center pt-28 pb-16'>
//           <h1 className="text-4xl font-bold">Prospectus</h1>
//           <div>
//             <p className='text-center'>
//               Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque rerum distinctio, beatae, architecto, nihil unde omnis quas veniam tenetur quam exercitationem non in deserunt. Ipsa aut nostrum aspernatur temporibus ullam!
//             </p>
//           </div>
//         </div>

//         <div>
//           <h1>Download Prospectus</h1>
//           <p>Click
//             <span onClick={getProspectus} className='text-blue-700 cursor-pointer'> here </span> to fetch the prospectus.
//           </p>
//           {isLoading && <span>Loading...</span>}
//           {pdf && (
//             <button onClick={handleDownload} className="text-blue-700 cursor-pointer">
//               Download Prospectus
//             </button>
//           )}
//         </div>

//         <SocicalContact />
//         <Footer />
//       </div>
//     </>
//   );
// };

// export default ProspectusPage;
"use client";
import Footer from '@/components/ui/Footer';
import Header from '@/components/ui/Header';
import SocicalContact from '@/components/ui/SocicalContact';
import { fetchProspectus } from '@/lib/actions';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const ProspectusPage = () => {
  const [pdf, setPdf] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getProspectus = async () => {
    setIsLoading(true);
    try {
      const existingPdf = await fetchProspectus();
      setPdf(existingPdf[0]?.file || "");
    } catch (error) {
      toast.error("Failed to fetch prospectus, please try again!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (pdf?.length === 0) {
      toast("No prospectus found, please try again!");
    }
  }, [pdf]);

  return (
    <>
      <Header />
      <div className="w-full bg-white flex flex-col">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-blue-700 to-blue-600 w-full flex flex-col gap-6 text-white items-center justify-center py-32"
        >
          <h1 className="text-5xl font-bold text-center">School Prospectus</h1>
          <p className="text-lg text-center max-w-2xl px-4">
            Discover everything you need to know about our school. Our prospectus provides detailed information about our curriculum, facilities, extracurricular activities, and the unique opportunities we offer to our students.
          </p>
          <p className="text-lg text-center max-w-2xl px-4">
            We are committed to nurturing young minds and preparing them for a bright future. Download or view our prospectus to learn more about how we can support your child's educational journey.
          </p>
        </motion.div>

        {/* Prospectus Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="w-full max-w-6xl mx-auto p-8"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-6">View or Download Our Prospectus</h2>
          <p className="text-gray-600 mb-6">
            Click the button below to fetch and view our latest prospectus. If you prefer to download it, you can do so directly from the embedded viewer.
          </p>
          <button
            onClick={getProspectus}
            disabled={isLoading}
            className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            {isLoading ? "Fetching Prospectus..." : "View Prospectus"}
          </button>

          {isLoading && (
            <div className="mt-6 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-700"></div>
            </div>
          )}

          {pdf && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mt-8 bg-gray-50 p-6 rounded-lg shadow-lg"
            >
              <iframe
                src={pdf}
                width="100%"
                height="600px"
                className="rounded-lg"
                style={{ border: 'none' }}
                title="Prospectus PDF"
              >
                Your browser does not support PDFs. Please download the PDF to view it: 
                <a href={pdf} download="prospectus.pdf" className="text-blue-700 underline">
                  Download PDF
                </a>
              </iframe>
            </motion.div>
          )}
        </motion.div>

        {/* Additional Information Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="w-full bg-gray-50 py-16"
        >
          <div className="w-full max-w-6xl mx-auto px-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Why Choose Our School?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Academic Excellence</h3>
                <p className="text-gray-600">
                  Our school offers a rigorous academic program designed to challenge and inspire students to achieve their full potential.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">State-of-the-Art Facilities</h3>
                <p className="text-gray-600">
                  From modern classrooms to advanced science labs and sports facilities, we provide an environment conducive to learning and growth.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Holistic Development</h3>
                <p className="text-gray-600">
                  We focus on the overall development of our students, including academics, sports, arts, and character building.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <SocicalContact />
        <Footer />
      </div>
    </>
  );
};

export default ProspectusPage;

// "use client"
// import Footer from '@/components/ui/Footer'
// import Header from '@/components/ui/Header'

// import SocicalContact from '@/components/ui/SocicalContact'
// import { fetchProspectus } from '@/lib/actions'
// import { Download } from 'lucide-react'

// import Link from 'next/link'
// import React, { useEffect, useState } from 'react'
// import { toast } from 'react-toastify'

// const ProspectusPage = () => {

//   const [pdf, setPdf] = useState<string>();
//   const [isLoading, setIsLoading] = useState<boolean>(false);

//   const getProspectus = async () =>{
//     setIsLoading(true);
//     try {
//       const existingPdf = await fetchProspectus();
//       setPdf(existingPdf[0]?.file || "");
//     } catch (error) {
//       toast.error("Failed to fetch prospectus, please try again!");
//     }
//   }

//   useEffect(() =>{
//     if (pdf) {
//       setIsLoading(false);
//     }

//     if(pdf?.length) {
//       setIsLoading(false);
//       toast("No prospectus found, please try again!");
//     }
//   },[isLoading]);


//   return (
//     <>
//             <Header/>
//             <div className="w-full bg-white flex flex-col">
    
//               <div className='bg-blue-700 w-full flex flex-col gap-6 text-white items-center justify-center pt-28 pb-16'>
//                   <h1 className="text-4xl font-bold">
//                     Prospectus
//                   </h1>
//                   <div>
//                       <p className='text-center'>
//                         Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque rerum distinctio, beatae, architecto, nihil unde omnis quas veniam tenetur quam exercitationem non in deserunt. Ipsa aut nostrum aspernatur temporibus ullam!
//                       </p>
                      
//                   </div>
//               </div>

              
//               <div>
//                   <h1>Download Prospectus</h1>
//                   <p > Click 
//                     <span  onClick={getProspectus}
//                     className=' text-blue-700 cursor-pointer'
//                     > here </span> to download prospectus </p>
//                   {
//                     isLoading && <span>Loading...</span>
//                   }
//                   {
//                     pdf && (
//                       // <Link href={`/downloads/${pdf}`}>
//                       <Link href={pdf}>
//                           Download Prospectus
//                       </Link>
//                     )
//                   }
//               </div>
          

//               <SocicalContact/>
//               <Footer/>
//             </div>
//         </>
//   )
// }

// export default ProspectusPage
