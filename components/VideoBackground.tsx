import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { siteConfig } from "@/config/site";

const VideoBackgroundSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(
        (prevIndex) => (prevIndex + 1) % siteConfig.videoSources.length,
      );
    }, 5000); // 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Background with fade transition */}
      <AnimatePresence mode="wait">
        <motion.video
          key={siteConfig.videoSources[currentIndex]}
          autoPlay
          muted
          playsInline
          animate={{ opacity: 1 }}
          className="absolute inset-0 w-full h-full object-cover"
          exit={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <source
            src={siteConfig.videoSources[currentIndex]}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </motion.video>
      </AnimatePresence>
    </>
  );
};

export default VideoBackgroundSection;

// import React, { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// const videoSources = ["/compute_shop.mp4", "/girl_product.mp4", "/photo.avif"];

// const VideoBackgroundSection = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % videoSources.length);
//     }, 5000); // 5 seconds

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
//       {/* Background Video with fade transition */}
//       <AnimatePresence mode="wait">
//         <motion.video
//           key={videoSources[currentIndex]}
//           autoPlay
//           muted
//           playsInline
//           className="absolute inset-0 w-full h-full object-cover"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 1 }}
//           transition={{ duration: 1 }}
//         >
//           <source src={videoSources[currentIndex]} type="video/mp4" />
//           Your browser does not support the video tag.
//         </motion.video>
//       </AnimatePresence>

//       {/* Optional dark overlay for text readability */}
//       <div className="absolute inset-0 bg-black/40" />

//       {/* Foreground content */}
//       <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 sm:py-24 text-center">
//         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
//           <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-pink-600 bg-clip-text text-transparent">
//             Welcome to GrootHub
//           </h1>
//           <p className="text-xl text-white mb-8 max-w-3xl mx-auto">
//             Discover amazing products at unbeatable prices. Your one-stop shop
//             for everything you need.
//           </p>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default VideoBackgroundSection;
