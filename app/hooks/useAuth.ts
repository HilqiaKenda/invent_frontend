import { api } from "@/lib/api";

import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import { apiRequest, authUtils } from "@/lib/api";
import {
  ProductListItem,
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  ApiError,
  Category,
  Cart,
  CartItem,
  Order,
  User,
} from "@/types";

// ============= AUTH HOOKS =============
export const useLogin = () => {
  return useMutation<AuthResponse, ApiError, LoginRequest>({
    mutationFn: (credentials) => apiRequest.post("/auth/login/", credentials),
    onSuccess: (data) => {
      authUtils.setTokens(data.access, data.refresh);
    },
  });
};

export const useRegister = () => {
  return useMutation<AuthResponse, ApiError, RegisterRequest>({
    mutationFn: (userData) => apiRequest.post("/auth/register/", userData),
    onSuccess: (data) => {
      authUtils.setTokens(data.access, data.refresh);
    },
  });
};

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

export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: () => apiService.getProfile().then((res) => res.data),
    retry: false,
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: apiService.updateProfile,
    onSuccess: (response) => {
      queryClient.setQueryData(["profile"], response.data);
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};

// Authentication helper functions
export const authHelpers = {
  login: async (email: string, password: string) => {
    // This would be your actual login API call
    const response = await api.post("/auth/login/", { email, password });
    const { token, user } = response.data;
    localStorage.setItem("authToken", token);
    return user;
  },

  register: async (email: string, password: string, name: string) => {
    const response = await api.post("/auth/register/", {
      email,
      password,
      name,
    });
    const { token, user } = response.data;
    localStorage.setItem("authToken", token);
    return user;
  },

  logout: () => {
    localStorage.removeItem("authToken");
    window.location.href = "/";
  },

  isAuthenticated: () => {
    return !!localStorage.getItem("authToken");
  },
};
