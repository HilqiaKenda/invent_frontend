"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useState } from "react";

export const Navigation = ({ currentPage, setCurrentPage }) => {
  const { isDark, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Home", icon: "🏠" },
    { id: "about", label: "About", icon: "ℹ️" },
    { id: "faq", label: "FAQ", icon: "❓" },
    { id: "signin", label: "Sign In", icon: "🔐" },
    { id: "signup", label: "Sign Up", icon: "📝" },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 ${isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"} border-b shadow-lg`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <motion.div
            className="flex items-center space-x-2 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            // onClick={() => setCurrentPage("home")}
          >
            <span className="text-2xl">🛍️</span>
            <span
              className={`text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent`}
            >
              GrootHub
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                // onClick={() => setCurrentPage(item.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-lg transition-all ${
                  currentPage === item.id
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                    : isDark
                      ? "text-gray-300 hover:bg-gray-800"
                      : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </motion.button>
            ))}
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              className={`ml-4 p-2 rounded-full ${isDark ? "bg-gray-800" : "bg-gray-100"}`}
            >
              {isDark ? "🌞" : "🌙"}
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <button onClick={toggleTheme} className="p-2">
              {isDark ? "🌞" : "🌙"}
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
              {isMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden pb-4"
            >
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    // setCurrentPage(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-lg mb-2 ${
                    currentPage === item.id
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                      : isDark
                        ? "text-gray-300 hover:bg-gray-800"
                        : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};
// const Navigation = ({ isMobile = false }) => {
//   const navItems = [
//     { label: "Home", href: "#" },
//     { label: "Products", href: "#" },
//     { label: "Categories", href: "#" },
//     { label: "About", href: "#" },
//   ];

//   const baseClasses = "text-gray-700 hover:text-purple-600 transition-colors";

//   if (isMobile) {
//     return (
//       <nav className="flex flex-col space-y-4">
//         {navItems.map((item) => (
//           <a key={item.label} href={item.href} className={baseClasses}>
//             {item.label}
//           </a>
//         ))}
//       </nav>
//     );
//   }

//   return (
//     <nav className="hidden md:flex items-center space-x-8">
//       {navItems.map((item) => (
//         <a key={item.label} href={item.href} className={baseClasses}>
//           {item.label}
//         </a>
//       ))}
//     </nav>
//   );
// };

// export default Navigation;
