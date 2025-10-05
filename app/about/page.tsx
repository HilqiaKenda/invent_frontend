"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useCart } from "../hooks/api";

// import { title } from "@/components/primitives";

// export default function AboutPage() {
//   return (
//     <div>
//       <h1 className={title()}>About</h1>
//     </div>
//   );
// }

const CartPage = ({ onContinueShopping }) => {
  const { isDark } = useTheme();
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartCount,
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${isDark ? "bg-gray-900" : "bg-gray-50"}`}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="text-8xl mb-6">🛒</div>
          <h2
            className={`text-3xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}
          >
            Your cart is empty
          </h2>
          <p
            className={`text-lg mb-8 ${isDark ? "text-gray-400" : "text-gray-600"}`}
          >
            Add some products to get started!
          </p>
          <button
            onClick={onContinueShopping}
            className="px-8 py-4 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:shadow-lg transition-all"
          >
            Start Shopping
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen py-12 ${isDark ? "bg-gray-900" : "bg-gray-50"}`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1
            className={`text-4xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}
          >
            Shopping Cart ({cartCount})
          </h1>
          <button
            onClick={clearCart}
            className={`px-4 py-2 rounded-lg ${isDark ? "bg-gray-800 text-red-400" : "bg-red-100 text-red-600"} font-semibold`}
          >
            Clear Cart
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`${isDark ? "bg-gray-800" : "bg-white"} rounded-xl p-6 shadow-lg`}
              >
                <div className="flex gap-6">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3
                          className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}
                        >
                          {item.name}
                        </h3>
                        <p
                          className={isDark ? "text-gray-400" : "text-gray-600"}
                        >
                          {item.category}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 text-2xl"
                      >
                        ×
                      </button>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className={`w-8 h-8 rounded ${
                            isDark ? "bg-gray-700" : "bg-gray-200"
                          } font-bold`}
                        >
                          -
                        </button>
                        <span
                          className={`font-bold ${isDark ? "text-white" : "text-gray-900"}`}
                        >
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className={`w-8 h-8 rounded ${
                            isDark ? "bg-gray-700" : "bg-gray-200"
                          } font-bold`}
                        >
                          +
                        </button>
                      </div>
                      <div className="text-right">
                        <div
                          className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
                        >
                          ${item.price.toFixed(2)} each
                        </div>
                        <div className="text-2xl font-bold text-blue-600">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className={`${isDark ? "bg-gray-800" : "bg-white"} rounded-xl p-6 shadow-xl sticky top-24`}
            >
              <h2
                className={`text-2xl font-bold mb-6 ${isDark ? "text-white" : "text-gray-900"}`}
              >
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className={isDark ? "text-gray-400" : "text-gray-600"}>
                    Subtotal
                  </span>
                  <span className={isDark ? "text-white" : "text-gray-900"}>
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className={isDark ? "text-gray-400" : "text-gray-600"}>
                    Shipping
                  </span>
                  <span className="text-green-600 font-semibold">FREE</span>
                </div>
                <div className="flex justify-between">
                  <span className={isDark ? "text-gray-400" : "text-gray-600"}>
                    Tax
                  </span>
                  <span className={isDark ? "text-white" : "text-gray-900"}>
                    ${(cartTotal * 0.1).toFixed(2)}
                  </span>
                </div>
                <div
                  className={`border-t ${isDark ? "border-gray-700" : "border-gray-200"} pt-4`}
                >
                  <div className="flex justify-between text-xl font-bold">
                    <span className={isDark ? "text-white" : "text-gray-900"}>
                      Total
                    </span>
                    <span className="text-blue-600">
                      ${(cartTotal * 1.1).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all mb-4"
              >
                Proceed to Checkout 🚀
              </motion.button>

              <button
                onClick={onContinueShopping}
                className={`w-full py-3 rounded-lg ${
                  isDark
                    ? "bg-gray-700 text-white"
                    : "bg-gray-100 text-gray-900"
                } font-semibold`}
              >
                Continue Shopping
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
