import { api, apiService } from "@/lib/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

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
