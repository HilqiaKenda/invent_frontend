import { apiService } from "@/lib/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export const useAdminOrders = (params?: { status?: string; user?: string }) => {
  return useQuery({
    queryKey: ["adminOrders", params],
    queryFn: () => apiService.getAdminOrders(params).then((res) => res.data),
    retry: false,
  });
};

export const useAdminOrder = (id: number) => {
  return useQuery({
    queryKey: ["adminOrder", id],
    queryFn: () => apiService.getAdminOrder(id).then((res) => res.data),
    enabled: !!id,
  });
};

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) =>
      apiService.updateOrderStatus(id, status),
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({ queryKey: ["adminOrders"] });
      queryClient.invalidateQueries({ queryKey: ["adminOrder", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["adminDashboard"] });
      toast.success("Order status updated successfully");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Failed to update order status"
      );
    },
  });
};

export const useAdminDashboard = () => {
  return useQuery({
    queryKey: ["adminDashboard"],
    queryFn: () => apiService.getAdminDashboard().then((res) => res.data),
    refetchInterval: 30000, // Refetch every 30 seconds
  });
};
