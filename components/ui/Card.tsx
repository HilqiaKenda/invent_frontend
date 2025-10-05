import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  padding?: "sm" | "md" | "lg";
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  hover = false,
  padding = "md",
}) => {
  const paddingClasses = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  return (
    <motion.div
      whileHover={hover ? { y: -4, scale: 1.02 } : {}}
      className={`
        bg-white rounded-xl shadow-lg border border-gray-100
        ${hover ? "cursor-pointer" : ""}
        ${paddingClasses[padding]}
        ${className}
      `}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
};
