"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { User } from "@/types";
import { authUtils } from "@/lib/api";
import { useUser } from "@/app/hooks/api";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const {
    data: userData,
    isLoading: userLoading,
    error: userError,
    refetch: refetchUser,
  } = useUser();

  useEffect(() => {
    // Initialize auth state
    const initializeAuth = async () => {
      const isAuth = authUtils.isAuthenticated();
      if (isAuth && userData) {
        setUser(userData);
      } else if (userError) {
        // Clear invalid tokens
        authUtils.clearTokens();
        setUser(null);
      }
      setIsInitialized(true);
    };

    initializeAuth();
  }, [userData, userError]);

  useEffect(() => {
    if (userData) {
      setUser(userData);
    }
  }, [userData]);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    authUtils.clearTokens();
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading: !isInitialized || userLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
