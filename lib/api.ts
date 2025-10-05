import axios, { AxiosResponse, AxiosError } from "axios";
import { ApiError } from "@/types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1.1.1";

// Create axios instance
export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("access_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh and errors
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as any;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (typeof window !== "undefined") {
        const refreshToken = localStorage.getItem("refresh_token");

        if (refreshToken) {
          try {
            const response = await axios.post(
              `${API_BASE_URL}/auth/token/refresh/`,
              {
                refresh: refreshToken,
              }
            );

            const { access } = response.data;
            localStorage.setItem("access_token", access);
            originalRequest.headers.Authorization = `Bearer ${access}`;

            return api(originalRequest);
          } catch (refreshError) {
            // Refresh failed, redirect to login
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            window.location.href = "/auth/login";
            return Promise.reject(refreshError);
          }
        } else {
          // No refresh token, redirect to login
          window.location.href = "/auth/login";
        }
      }
    }

    // Transform axios error to our ApiError format
    const apiError: ApiError = {
      message:
        error.response?.data?.message || error.message || "An error occurred",
      status: error.response?.status || 500,
      details: error.response?.data?.details,
    };

    return Promise.reject(apiError);
  }
);

// Helper functions for common API operations
export const apiRequest = {
  get: <T>(url: string, params?: Record<string, any>): Promise<T> =>
    api.get(url, { params }).then((res) => res.data),

  post: <T>(url: string, data?: any): Promise<T> =>
    api.post(url, data).then((res) => res.data),

  put: <T>(url: string, data?: any): Promise<T> =>
    api.put(url, data).then((res) => res.data),

  patch: <T>(url: string, data?: any): Promise<T> =>
    api.patch(url, data).then((res) => res.data),

  delete: <T>(url: string): Promise<T> =>
    api.delete(url).then((res) => res.data),
};

// Auth utilities
export const authUtils = {
  setTokens: (access: string, refresh: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);
    }
  },

  clearTokens: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
    }
  },

  getAccessToken: (): string | null => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("access_token");
    }
    return null;
  },

  isAuthenticated: (): boolean => {
    return !!authUtils.getAccessToken();
  },
};

// import axios from "axios";
// import {
//   Product,
//   Category,
//   Cart,
//   CartItem,
//   Order,
//   User,
//   UserProfile,
//   OrderItem,
// } from "@/types";

// // API Base Configuration
// const API_BASE_URL =
//   process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

// export const api = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Request interceptor to add auth token
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("authToken");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Response interceptor for error handling
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       // Handle unauthorized access
//       localStorage.removeItem("authToken");
//       window.location.href = "/login";
//     }
//     return Promise.reject(error);
//   }
// );

// // API Endpoints
// export const endpoints = {
//   // Products
//   products: "/products/",
//   productDetail: (id: number) => `/products/${id}/`,

//   // Categories
//   categories: "/categories/",

//   // User & Profile
//   profile: "/profile/",

//   // Cart
//   cart: "/cart/",
//   cartItems: "/cart/items/",
//   cartItemDetail: (id: number) => `/cart/items/${id}/`,
//   clearCart: "/cart/clear/",

//   // Orders
//   orders: "/orders/",
//   orderDetail: (id: number) => `/orders/${id}/`,
//   orderStats: "/orders/stats/",

//   // Admin
//   adminOrders: "/admin/orders/",
//   adminOrderDetail: (id: number) => `/admin/orders/${id}/`,
//   updateOrderStatus: (id: number) => `/admin/orders/${id}/status/`,
//   adminDashboard: "/admin/dashboard/",
// } as const;

// // API Functions
// export const apiService = {
//   // Products
//   getProducts: (params?: { search?: string; category?: string }) =>
//     api.get<Product[]>(endpoints.products, { params }),

//   getProduct: (id: number) => api.get<Product>(endpoints.productDetail(id)),

//   // Categories
//   getCategories: () => api.get<Category[]>(endpoints.categories),

//   // User Profile
//   getProfile: () => api.get<User>(endpoints.profile),

//   updateProfile: (data: Partial<UserProfile>) =>
//     api.patch<User>(endpoints.profile, data),

//   // Cart
//   getCart: () => api.get<Cart>(endpoints.cart),

//   getCartItems: () => api.get<CartItem[]>(endpoints.cartItems),

//   addToCart: (productId: number, quantity: number = 1) =>
//     api.post<CartItem>(endpoints.cartItems, {
//       product_id: productId,
//       quantity,
//     }),

//   updateCartItem: (id: number, quantity: number) =>
//     api.patch<CartItem>(endpoints.cartItemDetail(id), { quantity }),

//   removeFromCart: (id: number) => api.delete(endpoints.cartItemDetail(id)),

//   clearCart: () => api.delete(endpoints.clearCart),

//   // Orders
//   getOrders: () => api.get<Order[]>(endpoints.orders),

//   getOrder: (id: number) => api.get<Order>(endpoints.orderDetail(id)),

//   createOrder: (orderData: {
//     shipping_address: string;
//     shipping_phone: string;
//     shipping_cost?: number;
//     tax_amount?: number;
//     notes?: string;
//   }) => api.post<Order>(endpoints.orders, orderData),

//   getUserOrderStats: () =>
//     api.get<{
//       total_orders: number;
//       pending_orders: number;
//       completed_orders: number;
//       total_spent: number;
//     }>(endpoints.orderStats),

//   // Admin functions
//   getAdminOrders: (params?: { status?: string; user?: string }) =>
//     api.get<Order[]>(endpoints.adminOrders, { params }),

//   getAdminOrder: (id: number) => api.get<Order>(endpoints.adminOrderDetail(id)),

//   updateOrderStatus: (id: number, status: string) =>
//     api.patch<Order>(endpoints.updateOrderStatus(id), { status }),

//   getAdminDashboard: () =>
//     api.get<{
//       total_orders: number;
//       pending_orders: number;
//       total_revenue: number;
//       total_users: number;
//       total_products: number;
//       low_stock_products: number;
//     }>(endpoints.adminDashboard),
// };
