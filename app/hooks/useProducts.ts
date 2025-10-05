// import { apiService } from "@/lib/api";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// export const useProducts = (params?: {
//   search?: string;
//   category?: string;
// }) => {
//   return useQuery({
//     queryKey: ["products", params],
//     queryFn: () => apiService.getProducts(params).then((res) => res.data),
//     staleTime: 5 * 60 * 1000, // 5 minutes
//   });
// };

// export const useProduct = (id: number) => {
//   return useQuery({
//     queryKey: ["product", id],
//     queryFn: () => apiService.getProduct(id).then((res) => res.data),
//     enabled: !!id,
//   });
// };
