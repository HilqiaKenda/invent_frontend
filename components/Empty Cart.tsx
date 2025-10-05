const EmptyCart = ({ onClose }) => (
  <div className="flex flex-col items-center justify-center h-full text-center p-8">
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.1 }}
      className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4"
    >
      <ShoppingCart className="w-12 h-12 text-gray-400" />
    </motion.div>
    <h3 className="text-lg font-semibold text-gray-900 mb-2">
      Your cart is empty
    </h3>
    <p className="text-gray-500 mb-6">
      Discover amazing products and add them to your cart
    </p>
    <motion.button
      onClick={onClose}
      className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      Start Shopping
    </motion.button>
  </div>
);
