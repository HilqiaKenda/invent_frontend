import { useCart } from "@/app/hooks/api";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useState } from "react";

// Mock Products Data
const mockProducts = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 89.99,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
    description:
      "Premium wireless headphones with noise cancellation and 30-hour battery life. Experience crystal-clear audio quality.",
    category: "Electronics",
    rating: 4.5,
    reviews: 128,
    inStock: true,
    features: [
      "Noise Cancellation",
      "30h Battery",
      "Bluetooth 5.0",
      "Premium Sound",
    ],
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 199.99,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
    description:
      "Advanced smartwatch with fitness tracking, heart rate monitor, and customizable faces. Stay connected on the go.",
    category: "Wearables",
    rating: 4.7,
    reviews: 256,
    inStock: true,
    features: [
      "Heart Rate Monitor",
      "GPS Tracking",
      "Water Resistant",
      "7-Day Battery",
    ],
  },
  {
    id: 3,
    name: "Laptop Backpack",
    price: 49.99,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop",
    description:
      "Durable and stylish backpack with padded laptop compartment. Perfect for work, travel, and everyday use.",
    category: "Accessories",
    rating: 4.3,
    reviews: 89,
    inStock: true,
    features: [
      "Padded Compartment",
      "Water Resistant",
      "USB Port",
      "Ergonomic Design",
    ],
  },
];

// Product Detail Page
export const ProductDetailPage = ({ productId, onBack }) => {
  const { isDark } = useTheme();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  const product =
    mockProducts.find((p) => p.id === productId) || mockProducts[0];

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div
      className={`min-h-screen py-12 ${isDark ? "bg-gray-900" : "bg-gray-50"}`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <motion.button
          onClick={onBack}
          whileHover={{ x: -5 }}
          className={`mb-8 flex items-center ${isDark ? "text-gray-300" : "text-gray-600"} hover:text-blue-600`}
        >
          ← Back to Products
        </motion.button>

        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50"
          >
            ✓ Added to cart successfully!
          </motion.div>
        )}

        <div className="grid md:grid-cols-2 gap-12">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div
              className={`${isDark ? "bg-gray-800" : "bg-white"} rounded-2xl p-8 shadow-xl mb-4`}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[0, 1, 2, 3].map((i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`${isDark ? "bg-gray-800" : "bg-white"} rounded-lg p-2 ${
                    selectedImage === i ? "ring-2 ring-blue-600" : ""
                  }`}
                >
                  <img
                    src={product.image}
                    alt=""
                    className="w-full h-20 object-cover rounded"
                  />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="mb-4">
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm ${
                  isDark
                    ? "bg-blue-900 text-blue-300"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {product.category}
              </span>
            </div>

            <h1
              className={`text-4xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}
            >
              {product.name}
            </h1>

            <div className="flex items-center mb-6">
              <div className="flex text-yellow-400 text-xl mr-2">
                {"★".repeat(Math.floor(product.rating))}
                {"☆".repeat(5 - Math.floor(product.rating))}
              </div>
              <span className={isDark ? "text-gray-400" : "text-gray-600"}>
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            <div className="text-4xl font-bold text-blue-600 mb-6">
              ${product.price.toFixed(2)}
            </div>

            <p
              className={`text-lg mb-6 ${isDark ? "text-gray-300" : "text-gray-600"}`}
            >
              {product.description}
            </p>

            <div className="mb-6">
              <h3
                className={`text-lg font-semibold mb-3 ${isDark ? "text-white" : "text-gray-900"}`}
              >
                Key Features
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {product.features.map((feature, i) => (
                  <div
                    key={i}
                    className={`flex items-center ${isDark ? "text-gray-300" : "text-gray-700"}`}
                  >
                    <span className="mr-2 text-green-500">✓</span>
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            <div
              className={`${isDark ? "bg-gray-800" : "bg-gray-100"} rounded-xl p-6 mb-6`}
            >
              <div className="flex items-center justify-between mb-4">
                <span
                  className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}
                >
                  Quantity
                </span>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className={`w-10 h-10 rounded-lg ${
                      isDark ? "bg-gray-700" : "bg-white"
                    } font-bold text-xl`}
                  >
                    -
                  </button>
                  <span
                    className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}
                  >
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className={`w-10 h-10 rounded-lg ${
                      isDark ? "bg-gray-700" : "bg-white"
                    } font-bold text-xl`}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <span className={isDark ? "text-gray-400" : "text-gray-600"}>
                  Subtotal
                </span>
                <span
                  className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}
                >
                  ${(product.price * quantity).toFixed(2)}
                </span>
              </div>

              <motion.button
                onClick={handleAddToCart}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                🛒 Add to Cart
              </motion.button>
            </div>

            <div className="flex space-x-4">
              <button
                className={`flex-1 py-3 rounded-lg ${
                  isDark ? "bg-gray-800 text-white" : "bg-white text-gray-900"
                } border-2 border-gray-300 font-semibold`}
              >
                ❤️ Add to Wishlist
              </button>
              <button
                className={`flex-1 py-3 rounded-lg ${
                  isDark ? "bg-gray-800 text-white" : "bg-white text-gray-900"
                } border-2 border-gray-300 font-semibold`}
              >
                🔗 Share
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
