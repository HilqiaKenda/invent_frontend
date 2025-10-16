import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";

import { ApiError } from "../utils/errorHandler";

import { apiRequest, authUtils } from "@/lib/api";
import {
  ProductListItem,
  Category,
  Cart,
  CartItem,
  Order,
  User,
  OrderStatus,
  // AdminDashboardStats,
  // CreateOrderRequest,
  // LoginRequest,
  // RegisterRequest,
  // AuthResponse,
} from "@/types";

// Query keys
export const queryKeys = {
  products: ["products"],
  product: (id: number) => ["product", id],
  categories: ["categories"],
  cart: ["cart"],
  cartItems: ["cartItems"],
  orders: ["orders"],
  order: (id: number) => ["order", id],
  user: ["user"],
  userStats: ["userStats"],
  adminStats: ["adminStats"],
  adminOrders: ["adminOrders"],
} as const;

// // ============= AUTH HOOKS =============
// export const useLogin = () => {
//   return useMutation<AuthResponse, ApiError, LoginRequest>({
//     mutationFn: (credentials) => apiRequest.post("/auth/login/", credentials),
//     onSuccess: (data) => {
//       authUtils.setTokens(data.access, data.refresh);
//     },
//   });
// };

// export const useRegister = () => {
//   return useMutation<AuthResponse, ApiError, RegisterRequest>({
//     mutationFn: (userData) => apiRequest.post("/auth/register/", userData),
//     onSuccess: (data) => {
//       authUtils.setTokens(data.access, data.refresh);
//     },
//   });
// };

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation<void, ApiError, void>({
    mutationFn: async () => {
      await apiRequest.post("/auth/logout/");
    },
    onSuccess: () => {
      authUtils.clearTokens();
      queryClient.clear();
    },
    onError: () => {
      // Even if logout fails on server, clear local tokens
      authUtils.clearTokens();
      queryClient.clear();
    },
  });
};

// ============= USER HOOKS =============
export const useUser = (): UseQueryResult<User, ApiError> => {
  return useQuery({
    queryKey: queryKeys.user,
    queryFn: () => apiRequest.get<User>("/profile/"),
    enabled: authUtils.isAuthenticated(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation<User, ApiError, Partial<User>>({
    mutationFn: (userData) => apiRequest.patch("/profile/", userData),
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.user, data);
    },
  });
};

export const useUserOrderStats = (): UseQueryResult<OrderStatus, ApiError> => {
  return useQuery({
    queryKey: queryKeys.userStats,
    queryFn: () => apiRequest.get<OrderStatus>("/orders/stats/"),
    enabled: authUtils.isAuthenticated(),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

// ============= PRODUCT HOOKS =============
export const useProducts = (params?: {
  search?: string;
  category?: number;
}) => {
  return useQuery({
    queryKey: [...queryKeys.products, params],
    queryFn: () => apiRequest.get<ProductListItem[]>("/products/", params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useProduct = (
  id: number
): UseQueryResult<ProductListItem, ApiError> => {
  return useQuery({
    queryKey: queryKeys.product(id),
    queryFn: () => apiRequest.get<ProductListItem>(`/products/${id}/`),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

// ============= CATEGORY HOOKS =============
export const useCategories = (): UseQueryResult<Category[], ApiError> => {
  return useQuery({
    queryKey: queryKeys.categories,
    queryFn: () => apiRequest.get<Category[]>("/categories/"),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

// ============= CART HOOKS =============
export const useCart = (): UseQueryResult<Cart, ApiError> => {
  return useQuery({
    queryKey: queryKeys.cart,
    queryFn: () => apiRequest.get<Cart>("/cart/"),
    enabled: authUtils.isAuthenticated(),
    staleTime: 30 * 1000, // 30 seconds
  });
};

export const useCartItems = (): UseQueryResult<CartItem[], ApiError> => {
  return useQuery({
    queryKey: queryKeys.cartItems,
    queryFn: () => apiRequest.get<CartItem[]>("/cart/items/"),
    enabled: authUtils.isAuthenticated(),
    staleTime: 30 * 1000,
  });
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation<
    CartItem,
    ApiError,
    { product_id: number; quantity: number }
  >({
    mutationFn: (data) => apiRequest.post("/cart/items/", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cart });
      queryClient.invalidateQueries({ queryKey: queryKeys.cartItems });
    },
  });
};

export const useUpdateCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation<CartItem, ApiError, { id: number; quantity: number }>({
    mutationFn: ({ id, quantity }) =>
      apiRequest.patch(`/cart/items/${id}/`, { quantity }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cart });
      queryClient.invalidateQueries({ queryKey: queryKeys.cartItems });
    },
  });
};

export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();

  return useMutation<void, ApiError, number>({
    mutationFn: (id) => apiRequest.delete(`/cart/items/${id}/`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cart });
      queryClient.invalidateQueries({ queryKey: queryKeys.cartItems });
    },
  });
};

export const useClearCart = () => {
  const queryClient = useQueryClient();

  return useMutation<{ message: string }, ApiError, void>({
    mutationFn: () => apiRequest.delete("/cart/clear/"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cart });
      queryClient.invalidateQueries({ queryKey: queryKeys.cartItems });
    },
  });
};

// ============= ORDER HOOKS =============
export const useOrders = (): UseQueryResult<Order[], ApiError> => {
  return useQuery({
    queryKey: queryKeys.orders,
    queryFn: () => apiRequest.get<Order[]>("/orders/"),
    enabled: authUtils.isAuthenticated(),
    staleTime: 2 * 60 * 1000,
  });
};

export const useOrder = (id: number): UseQueryResult<Order, ApiError> => {
  return useQuery({
    queryKey: queryKeys.order(id),
    queryFn: () => apiRequest.get<Order>(`/orders/${id}/`),
    enabled: !!id && authUtils.isAuthenticated(),
    staleTime: 2 * 60 * 1000,
  });
};

// export const useCreateOrder = () => {
//   const queryClient = useQueryClient();

//   return useMutation<Order, ApiError, CreateOrderRequest>({
//     mutationFn: (orderData) => apiRequest.post("/orders/", orderData),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: queryKeys.orders });
//       queryClient.invalidateQueries({ queryKey: queryKeys.cart });
//       queryClient.invalidateQueries({ queryKey: queryKeys.cartItems });
//       queryClient.invalidateQueries({ queryKey: queryKeys.userStats });
//     },
//   });
// };

// // ============= ADMIN HOOKS =============
// export const useAdminStats = (): UseQueryResult<
//   AdminDashboardStats,
//   ApiError
// > => {
//   return useQuery({
//     queryKey: queryKeys.adminStats,
//     queryFn: () => apiRequest.get<AdminDashboardStats>("/admin/dashboard/"),
//     enabled: authUtils.isAuthenticated(),
//     staleTime: 2 * 60 * 1000,
//   });
// };

export const useAdminOrders = (params?: { status?: string; user?: number }) => {
  return useQuery({
    queryKey: [...queryKeys.adminOrders, params],
    queryFn: () => apiRequest.get<Order[]>("/admin/orders/", params),
    enabled: authUtils.isAuthenticated(),
    staleTime: 60 * 1000,
  });
};

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation<Order, ApiError, { id: number; status: string }>({
    mutationFn: ({ id, status }) =>
      apiRequest.patch(`/admin/orders/${id}/status/`, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.adminOrders });
      queryClient.invalidateQueries({ queryKey: queryKeys.adminStats });
    },
  });
};
