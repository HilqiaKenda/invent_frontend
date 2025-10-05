import { motion } from "framer-motion";

const CategoryFilter = ({
  // @ts-ignore
  categories,
  // @ts-ignore
  selectedCategory,
  // @ts-ignore
  onCategorySelect,
  // @ts-ignore
  products,
}) => (
  <motion.div
    className="flex flex-wrap justify-center gap-4 mb-12"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.3 }}
  >
    <motion.button
      onClick={() => onCategorySelect("all")}
      className={`px-6 py-3 rounded-full font-medium transition-all ${
        selectedCategory === "all"
          ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      All Products
      <span className="ml-2 bg-white/20 text-xs px-2 py-1 rounded-full">
        {products.length}
      </span>
    </motion.button>

    {categories.map((category: Any) => (
      <motion.button
        key={category.id}
        onClick={() => onCategorySelect(category.name)}
        className={`px-6 py-3 rounded-full font-medium transition-all ${
          selectedCategory === category.name
            ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {category.name}
        <span className="ml-2 bg-white/20 text-xs px-2 py-1 rounded-full">
          {products.filter((p) => p.category.name === category.name).length}
        </span>
      </motion.button>
    ))}
  </motion.div>
);

export default CategoryFilter;
