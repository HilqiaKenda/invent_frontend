import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { apiService } from "@/lib/api";

export const useCart = () => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: () => apiService.getCart().then((res) => res.data),
    retry: false,
  });
};

export const useCartItems = () => {
  return useQuery({
    queryKey: ["cartItems"],
    queryFn: () => apiService.getCartItems().then((res) => res.data),
    retry: false,
  });
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      productId,
      quantity,
    }: {
      productId: number;
      quantity?: number;
    }) => apiService.addToCart(productId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      queryClient.invalidateQueries({ queryKey: ["cartItems"] });
      toast.success("Product added to cart!");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Failed to add product to cart",
      );
    },
  });
};

export const useUpdateCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, quantity }: { id: number; quantity: number }) =>
      apiService.updateCartItem(id, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      queryClient.invalidateQueries({ queryKey: ["cartItems"] });
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Failed to update cart item",
      );
    },
  });
};

export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => apiService.removeFromCart(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      queryClient.invalidateQueries({ queryKey: ["cartItems"] });
      toast.success("Item removed from cart");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Failed to remove item from cart",
      );
    },
  });
};

export const useClearCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: apiService.clearCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      queryClient.invalidateQueries({ queryKey: ["cartItems"] });
      toast.success("Cart cleared");
    },
  });
};
