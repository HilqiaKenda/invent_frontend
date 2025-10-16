"use client";
import React from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";

import { Cart } from "@/types";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

interface CartSummaryProps {
  cart: Cart;
  onCheckout?: () => void;
  isCheckingOut?: boolean;
}

export const CartSummary: React.FC<CartSummaryProps> = ({
  cart,
  onCheckout,
  isCheckingOut = false,
}) => {
  const subtotal = parseFloat(cart.total_price);
  const tax = subtotal * 0.1; // 10% tax
  const shipping = subtotal > 50 ? 0 : 10; // Free shipping over $50
  const total = subtotal + tax + shipping;

  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Order Summary
      </h3>

      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">
            Subtotal ({cart.total_items} items)
          </span>
          <span className="font-medium">
            $<CountUp decimals={2} duration={0.5} end={subtotal} />
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium">
            {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Tax</span>
          <span className="font-medium">
            $<CountUp decimals={2} duration={0.5} end={tax} />
          </span>
        </div>

        <div className="border-t pt-3">
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>
              $<CountUp decimals={2} duration={0.8} end={total} />
            </span>
          </div>
        </div>
      </div>

      <motion.div
        className="mt-6"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button
          className="w-full"
          disabled={cart.total_items === 0}
          isLoading={isCheckingOut}
          size="lg"
          variant="primary"
          onClick={onCheckout}
        >
          Proceed to Checkout
        </Button>
      </motion.div>

      {subtotal < 50 && subtotal > 0 && (
        <p className="text-sm text-gray-500 mt-2 text-center">
          Add ${(50 - subtotal).toFixed(2)} more for free shipping!
        </p>
      )}
    </Card>
  );
};
