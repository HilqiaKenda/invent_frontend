import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { apiService } from "@/lib/api";

export const useOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: () => apiService.getOrders().then((res) => res.data),
    retry: false,
  });
};

export const useOrder = (id: number) => {
  return useQuery({
    queryKey: ["order", id],
    queryFn: () => apiService.getOrder(id).then((res) => res.data),
    enabled: !!id,
  });
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: apiService.createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      queryClient.invalidateQueries({ queryKey: ["cartItems"] });
      toast.success("Order created successfully!");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to create order");
    },
  });
};

export const useUserOrderStats = () => {
  return useQuery({
    queryKey: ["userOrderStats"],
    queryFn: () => apiService.getUserOrderStats().then((res) => res.data),
    retry: false,
  });
};
