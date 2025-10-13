"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { ProductGrid } from "@/components/products/ProductGrid";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import CountUp from "react-countup";
import { useCategories, useProducts } from "@/app/hooks/api";
import { useTheme } from "next-themes";
import { Link } from "@heroui/link";
import { siteConfig } from "@/config/site";
import VideoBackgroundSection from "./VideoBackground";

export const HomePage: React.FC = () => {
  const { user } = useAuth();
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<
    number | undefined
  >();

  const { data: products = [], isLoading: productsLoading } = useProducts({
    search: searchQuery,
    category: selectedCategory,
  });
  const { data: categories = [] } = useCategories();

  const stats = [
    // { label: "Products", value: products.length, color: "blue" },
    { label: "Products", value: 10, color: "blue" },
    // { label: "Categories", value: categories.length, color: "pink" },
    { label: "Categories", value: 1, color: "pink" },
    { label: "Rating", value: 4.8, color: "pink", decimals: 1 },
  ];

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-pink-50 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={siteConfig.containerVariants}
        className="relative overflow-hidden"
      >
        <div className="min-h-screen">
          <section className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat">
            <VideoBackgroundSection />

            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-pink-400/10 dark:from-blue-700/10 dark:to-pink-700/10" />
            <div className="relative max-w-7xl mx-auto px-4 py-20 sm:py-24 text-center">
              <motion.div variants={itemVariants}>
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-pink-600 bg-clip-text text-transparent">
                  Welcome to GrootHub
                </h1>
                {user && (
                  <motion.p
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl text-gray-700 dark:text-gray-300 mb-4"
                  >
                    Hello, {user.first_name || user.username}! 👋
                  </motion.p>
                )}
                <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
                  Discover amazing products at unbeatable prices. Your one-stop
                  shop for everything you need.
                </p>
              </motion.div>

              <div className="grid grid-cols-3 gap-8 mb-12 max-w-2xl mx-auto">
                {stats.map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="text-center"
                  >
                    <div
                      className={`text-3xl font-bold text-${stat.color}-600`}
                    >
                      <CountUp
                        end={stat.value}
                        decimals={stat.decimals || 0}
                        duration={2}
                      />
                      {stat.decimals ? "" : "M+"}
                    </div>
                    <div className="text-gray-700 dark:text-gray-400">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div variants={itemVariants} className="max-w-2xl mx-auto">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Input
                    placeholder="Search for products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 h-14 text-lg"
                  />
                  <Button
                    size="lg"
                    className="h-14 px-8 bg-gradient-to-r from-blue-600 to-pink-600 hover:from-pink-600 hover:to-blue-600 text-white"
                  >
                    Search 🔍
                  </Button>
                </div>
              </motion.div>
            </div>
          </section>
        </div>
      </motion.section>

      {/* Categories */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={siteConfig.containerVariants}
        className="py-16"
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Shop by Category
            </h2>
            <p className="text-gray-700 dark:text-gray-400 max-w-2xl mx-auto">
              Explore our wide range of categories to find exactly what you're
              looking for
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4 mb-8"
          >
            <Button
              variant={selectedCategory === undefined ? "gradient" : "outline"}
              onClick={() => setSelectedCategory(undefined)}
              size="md"
            >
              All Products
            </Button>
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={
                  selectedCategory === category.id ? "gradient" : "outline"
                }
                onClick={() => setSelectedCategory(category.id)}
                size="md"
              >
                {category.name}
              </Button>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Products */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={siteConfig.containerVariants}
        className="py-16 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {searchQuery || selectedCategory
                ? "Search Results"
                : "Featured Products"}
            </h2>
            {products.length > 0 && (
              <p className="text-gray-700 dark:text-gray-400">
                Showing {products.length} product
                {products.length !== 1 ? "s" : ""}
                {searchQuery && ` for "${searchQuery}"`}
              </p>
            )}
          </motion.div>
          <motion.div variants={itemVariants}>
            <ProductGrid products={products} isLoading={productsLoading} />
          </motion.div>
        </div>
      </motion.section>

      {/* Features */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={siteConfig.containerVariants}
        className="py-20 bg-gradient-to-r from-blue-600 to-pink-600 text-white dark:from-blue-700 dark:to-pink-700"
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Why Choose GrootHub?
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              We provide the best shopping experience with amazing features
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {siteConfig.grootHub.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center p-6 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-pink-500/20"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="opacity-90">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Newsletter */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={siteConfig.containerVariants}
        className="py-20"
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div variants={itemVariants}>
            <Link href="">
              <Card
                padding="lg"
                className="bg-gradient-to-r from-blue-50 to-pink-50 border-2 border-pink-400 dark:from-gray-800 dark:to-gray-900 dark:border-pink-600"
              >
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Stay Updated! 📧
                </h2>
                <p className="text-gray-700 dark:text-gray-400 mb-8 text-lg">
                  Subscribe to our newsletter and get exclusive deals and
                  updates
                </p>
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1"
                  />
                  <Button variant="gradient" size="md">
                    Subscribe
                  </Button>
                </div>
              </Card>
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

// "use client";

// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { useRouter } from "next/navigation";
// import { useAuth } from "@/contexts/AuthContext";
// import { Button } from "@heroui/button";
// import { Input } from "@heroui/input";
// import { Card } from "@heroui/card";
// import CountUp from "react-countup";
// import { useCategories, useProducts } from "@/app/hooks/api";
// import { useTheme } from "next-themes";
// import { Link } from "@heroui/link";
// import { siteConfig } from "@/config/site";
// import { Spinner } from "@heroui/spinner";

// export const HomePage: React.FC = () => {
//   const { user } = useAuth();
//   const { theme } = useTheme();
//   const router = useRouter();
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState<
//     number | undefined
//   >();
//   const [currentBg, setCurrentBg] = useState(0);

//   const { data: products = [], isLoading: productsLoading } = useProducts({
//     search: searchQuery,
//     category: selectedCategory,
//   });
//   const { data: categories = [] } = useCategories();

//   // Image rotation
//   const backgroundImages = [
//     "https://source.unsplash.com/1600x900/?shopping",
//     "https://source.unsplash.com/1600x900/?store",
//     "https://source.unsplash.com/1600x900/?fashion",
//     "https://source.unsplash.com/1600x900/?gadgets",
//   ];
//   useEffect(() => {
//     const interval = setInterval(
//       () => setCurrentBg((prev) => (prev + 1) % backgroundImages.length),
//       6000
//     );
//     return () => clearInterval(interval);
//   }, []);

//   const stats = [
//     { label: "Products", value: products.length || 10, color: "blue" },
//     { label: "Categories", value: categories.length || 1, color: "pink" },
//     { label: "Rating", value: 4.8, color: "pink", decimals: 1 },
//   ];

//   return (
//     <div className="relative min-h-screen overflow-hidden">
//       {/* Background Video */}
//       <video
//         className="absolute inset-0 w-full h-full object-cover opacity-50"
//         src="https://cdn.coverr.co/videos/coverr-shopping-cart-walking-down-the-aisle-9946/1080p.mp4"
//         autoPlay
//         muted
//         loop
//       />
//       {/* Overlay Image Slide */}
//       <motion.div
//         key={currentBg}
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         className="absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-700"
//         style={{
//           backgroundImage: `url(${backgroundImages[currentBg]})`,
//           opacity: 0.4,
//         }}
//       />
//       <div className="relative z-10 backdrop-blur-sm bg-gradient-to-b from-black/40 to-black/10 dark:from-gray-900/80 dark:to-gray-800/40">
//         {/* HERO */}
//         <section className="max-w-7xl mx-auto px-4 py-24 text-center text-white">
//           <motion.h1
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="text-5xl sm:text-6xl font-bold mb-4"
//           >
//             Welcome to GrootHub
//           </motion.h1>
//           {user && (
//             <p className="text-xl mb-4">
//               Hello, {user.first_name || user.username}! 👋
//             </p>
//           )}
//           <p className="text-lg text-gray-200 mb-8">
//             Discover amazing products at unbeatable prices. Your one-stop shop
//             for everything you need.
//           </p>

//           <div className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-4">
//             <Input
//               placeholder="Search for products..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="flex-1 bg-white text-black rounded-lg h-14"
//             />
//             <Button
//               onPress={() => {}}
//               size="lg"
//               className="h-14 px-8 bg-gradient-to-r from-blue-600 to-pink-600 hover:from-pink-600 hover:to-blue-600 text-white"
//             >
//               Search 🔍
//             </Button>
//           </div>

//           {/* Stats */}
//           <div className="grid grid-cols-3 gap-8 mt-12">
//             {stats.map((stat, i) => (
//               <div key={i} className="text-center">
//                 <div className={`text-3xl font-bold text-${stat.color}-400`}>
//                   <CountUp
//                     end={stat.value}
//                     decimals={stat.decimals || 0}
//                     duration={2}
//                   />
//                 </div>
//                 <div className="text-gray-200">{stat.label}</div>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* Categories */}
//         <section className="py-12 bg-white/10 dark:bg-gray-900/40 text-center">
//           <h2 className="text-3xl font-bold text-white mb-4">
//             Shop by Category
//           </h2>
//           <div className="flex flex-wrap justify-center gap-4">
//             <Button
//               variant={selectedCategory === undefined ? "gradient" : "flat"}
//               onPress={() => setSelectedCategory(undefined)}
//             >
//               All Products
//             </Button>
//             {categories.map((cat) => (
//               <Button
//                 key={cat.id}
//                 variant={selectedCategory === cat.id ? "gradient" : "flat"}
//                 onPress={() => setSelectedCategory(cat.id)}
//               >
//                 {cat.name}
//               </Button>
//             ))}
//           </div>
//         </section>

//         {/* Products */}
//         <section className="py-16 bg-white/70 dark:bg-gray-800/60">
//           <div className="max-w-7xl mx-auto px-4">
//             <h2 className="text-3xl font-bold text-center mb-10 dark:text-white">
//               {searchQuery || selectedCategory
//                 ? "Search Results"
//                 : "Featured Products"}
//             </h2>
//             {productsLoading ? (
//               <div className="flex justify-center">
//                 <Spinner color="primary" />
//               </div>
//             ) : (
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//                 {products.map((product) => (
//                   <motion.div
//                     key={product.id}
//                     whileHover={{ scale: 1.03 }}
//                     className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden relative"
//                   >
//                     <img
//                       src={
//                         product.image ||
//                         "https://source.unsplash.com/400x400/?product"
//                       }
//                       alt={product.name}
//                       className="w-full h-56 object-cover cursor-pointer"
//                       onClick={() => router.push(`/product/${product.id}`)}
//                     />
//                     <div className="p-4">
//                       <h3 className="font-semibold text-lg mb-2 dark:text-white">
//                         {product.name}
//                       </h3>
//                       <p className="text-gray-600 dark:text-gray-300 mb-4">
//                         ${product.price}
//                       </p>
//                       <Button
//                         onPress={() => console.log("Add to cart:", product.id)}
//                         className="w-full bg-gradient-to-r from-blue-600 to-pink-600 text-white"
//                       >
//                         🛒 Add to Cart
//                       </Button>
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// };
