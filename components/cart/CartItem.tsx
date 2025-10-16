"use client";
import React from "react";
import { motion } from "framer-motion";

import { CartItem as CartItemType } from "@/types";
import { Button } from "@/components/ui/Button";
// import { useUpdateCartItem, useRemoveFromCart } from "@/hooks/api";

interface CartItemProps {
  item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  // const updateCartItemMutation = useUpdateCartItem();
  // const removeFromCartMutation = useRemoveFromCart();

  // const handleQuantityChange = (newQuantity: number) => {
  //   if (newQuantity <= 0) {
  //     // removeFromCartMutation.mutate(item.id);
  //   } else {
  //     // updateCartItemMutation.mutate({
  //       id: item.id,
  //       quantity: newQuantity,
  //     });
  //   }
  // };

  const handleRemove = () => {
    // removeFromCartMutation.mutate(item.id);
  };

  return (
    <motion.div
      layout
      animate={{ opacity: 1, x: 0 }}
      className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-200"
      exit={{ opacity: 0, x: 20 }}
      initial={{ opacity: 0, x: -20 }}
    >
      {/* Product Image Placeholder */}
      <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
        <span className="text-2xl">📦</span>
      </div>

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-gray-900 truncate">
          {item.product.name}
        </h3>
        <p className="text-sm text-gray-500">{item.product.category.name}</p>
        <p className="text-lg font-semibold text-gray-900">
          ${parseFloat(item.product.price).toFixed(2)}
        </p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-2">
        <Button
          className="w-8 h-8 p-0"
          // disabled={updateCartItemMutation.isPending}
          size="sm"
          variant="outline"
          // onClick={() => handleQuantityChange(item.quantity - 1)}
        >
          −
        </Button>
        <span className="w-12 text-center font-medium">{item.quantity}</span>
        <Button
          className="w-8 h-8 p-0"
          // disabled={updateCartItemMutation.isPending}
          size="sm"
          variant="outline"
          // onClick={() => handleQuantityChange(item.quantity + 1)}
        >
          +
        </Button>
      </div>

      {/* Total Price */}
      <div className="text-lg font-bold text-gray-900 min-w-0">
        ${parseFloat(item.total_price).toFixed(2)}
      </div>

      {/* Remove Button */}
      <Button
        className="text-red-600 hover:text-red-700 hover:bg-red-50"
        // isLoading={removeFromCartMutation.isPending}
        size="sm"
        variant="ghost"
        onClick={handleRemove}
      >
        🗑️
      </Button>
    </motion.div>
  );
};
