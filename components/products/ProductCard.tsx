"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { Image } from "@heroui/react";

import { ProductListItem } from "@/types";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/contexts/AuthContext";
import { useAddToCart } from "@/app/hooks/api";
// import { siteConfig } from "@/config/site";

interface ProductCardProps {
  product: ProductListItem;
  onViewDetails?: (product: ProductListItem) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onViewDetails,
}) => {
  const { isAuthenticated } = useAuth();
  const addToCartMutation = useAddToCart();
  // const router = useRouter();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAuthenticated) return;

    addToCartMutation.mutate({ product_id: product.id, quantity: 1 });
  };

  const handleCardClick = () => onViewDetails?.(product);

  return (
    <motion.div
      layout
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      initial={{ opacity: 0, y: 20 }}
      whileHover={{ y: -8 }}
    >
      <Card
        hover
        className="h-full cursor-pointer border-2 border-transparent hover:border-pink-400 dark:hover:border-pink-600 transition-all bg-gradient-to-br from-blue-50 to-pink-50 dark:from-gray-900 dark:to-gray-800"
        // @ts-ignore
        onClick={handleCardClick}
      >
        <Link href={`/products/${product.id}`}>
          <div className="aspect-square rounded-lg mb-4 flex items-center justify-center bg-gradient-to-br from-blue-100 to-pink-100 dark:from-gray-700 dark:to-gray-800">
            <div className="text-6xl">📦</div>
            {/* {siteConfig.videoSources.map((img) => (
              <Image key={img} className="text-6xl" src={img} />
            ))} */}
          </div>
        </Link>

        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white line-clamp-2">
              {product.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {product.category.name}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-blue-600 dark:text-pink-400">
              ${parseFloat(product.price).toFixed(2)}
            </div>
            <Badge size="sm" variant={product.in_stock ? "success" : "danger"}>
              {product.in_stock ? "In Stock" : "Out of Stock"}
            </Badge>
          </div>

          {product.inventory && (
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {product.inventory.available_quantity} available
            </div>
          )}

          <Button
            as={Link}
            className="w-full bg-gradient-to-r from-blue-600 to-pink-600 text-white"
            disabled={!product.in_stock}
            isLoading={addToCartMutation.isPending}
            size="sm"
            // @ts-ignore
            variant="gradient"
            onClick={handleAddToCart}

            // href={`/products/${product.id}`}
            // onClick={() => router.push(`/product/${product.id}`)}
          >
            {!product.in_stock ? "Out of Stock" : "Add to Cart"}
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};
