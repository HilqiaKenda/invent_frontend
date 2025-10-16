"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { Link } from "@heroui/link";

import VideoBackgroundSection from "./VideoBackground";

import { useAuth } from "@/contexts/AuthContext";
import { ProductGrid } from "@/components/products/ProductGrid";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { useCategories, useProducts } from "@/app/hooks/api";
import { siteConfig } from "@/config/site";

export const HomePage: React.FC = () => {
  const { user } = useAuth();
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
        animate="visible"
        className="relative overflow-hidden"
        initial="hidden"
        variants={siteConfig.containerVariants}
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
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-xl text-gray-700 dark:text-gray-300 mb-4"
                    initial={{ opacity: 0, scale: 0.8 }}
                    transition={{ delay: 0.2 }}
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
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                    initial={{ opacity: 0, scale: 0.5 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div
                      className={`text-3xl font-bold text-${stat.color}-600`}
                    >
                      <CountUp
                        decimals={stat.decimals || 0}
                        duration={2}
                        end={stat.value}
                      />
                      {stat.decimals ? "" : "M+"}
                    </div>
                    <div className="text-gray-700 dark:text-gray-400">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div className="max-w-2xl mx-auto" variants={itemVariants}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Input
                    // @ts-ignore
                    className="flex-1 h-14 text-lg"
                    placeholder="Search for products..."
                    value={searchQuery}
                    // @ts-ignore
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Button
                    className="h-14 px-8 bg-gradient-to-r from-blue-600 to-pink-600 hover:from-pink-600 hover:to-blue-600 text-white"
                    size="lg"
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
        className="py-16"
        initial="hidden"
        variants={siteConfig.containerVariants}
        viewport={{ once: true }}
        whileInView="visible"
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.div className="text-center mb-12" variants={itemVariants}>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Shop by Category
            </h2>
            <p className="text-gray-700 dark:text-gray-400 max-w-2xl mx-auto">
              Explore our wide range of categories to find exactly what you are
              looking for
            </p>
          </motion.div>

          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-8"
            variants={itemVariants}
          >
            <Button
              size="md"
              // @ts-ignore
              variant={selectedCategory === undefined ? "gradient" : "outline"}
              onClick={() => setSelectedCategory(undefined)}
            >
              All Products
            </Button>
            {categories.map((category) => (
              <Button
                key={category.id}
                size="md"
                // @ts-ignore
                variant={
                  selectedCategory === category.id ? "gradient" : "outline"
                }
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Products */}
      <motion.section
        className="py-16 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
        initial="hidden"
        variants={siteConfig.containerVariants}
        viewport={{ once: true }}
        whileInView="visible"
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.div className="text-center mb-12" variants={itemVariants}>
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
            <ProductGrid isLoading={productsLoading} products={products} />
          </motion.div>
        </div>
      </motion.section>

      {/* Features */}
      <motion.section
        className="py-20 bg-gradient-to-r from-blue-600 to-pink-600 text-white dark:from-blue-700 dark:to-pink-700"
        initial="hidden"
        variants={siteConfig.containerVariants}
        viewport={{ once: true }}
        whileInView="visible"
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.div className="text-center mb-16" variants={itemVariants}>
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
                className="text-center p-6 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-pink-500/20"
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
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
        className="py-20"
        initial="hidden"
        variants={siteConfig.containerVariants}
        viewport={{ once: true }}
        whileInView="visible"
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div variants={itemVariants}>
            <Link href="">
              <Card
                className="bg-gradient-to-r from-blue-50 to-pink-50 border-2 border-pink-400 dark:from-gray-800 dark:to-gray-900 dark:border-pink-600"
                padding="lg"
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
                    // @ts-ignore
                    className="flex-1"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <Button
                    size="md"
                    // @ts-ignore
                    variant="gradient"
                  >
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
