"use client";
import React from "react";

import { ProductCard } from "./ProductCard";

import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { ProductListItem } from "@/types";

interface ProductGridProps {
  products: ProductListItem[];
  isLoading?: boolean;
  onProductClick?: (product: ProductListItem) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  isLoading,
  onProductClick,
}) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner size="lg" />
        <span className="ml-3 text-lg text-gray-600 dark:text-gray-300">
          Loading products...
        </span>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl text-gray-300 dark:text-gray-600 mb-4">🔍</div>
        <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
          No products found
        </h3>
        <p className="text-gray-500 dark:text-gray-500">
          Try adjusting your search or filters
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onViewDetails={onProductClick}
        />
      ))}
    </div>
  );
};

// "use client";
// import React from "react";

// import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
// import { ProductCard } from "./ProductCard";
// import { ProductListItem } from "@/types";

// interface ProductGridProps {
//   products: ProductListItem[];
//   isLoading?: boolean;
//   onProductClick?: (product: ProductListItem) => void;
// }

// export const ProductGrid: React.FC<ProductGridProps> = ({
//   products,
//   isLoading,
//   onProductClick,
// }) => {
//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center py-12">
//         <LoadingSpinner size="lg" />
//         <span className="ml-3 text-lg text-gray-600">Loading products...</span>
//       </div>
//     );
//   }

//   if (products.length === 0) {
//     return (
//       <div className="text-center py-12">
//         <div className="text-6xl text-gray-300 mb-4">🔍</div>
//         <h3 className="text-xl font-semibold text-gray-600 mb-2">
//           No products found
//         </h3>
//         <p className="text-gray-500">Try adjusting your search or filters</p>
//       </div>
//     );
//   }

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//       {products.map((product) => (
//         <ProductCard
//           key={product.id}
//           product={product}
//           onViewDetails={onProductClick}
//         />
//       ))}
//     </div>
//   );
// };
