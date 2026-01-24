"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/app/services/api";

type User = {
  _id: string;
  name: string;
  role: string;
  permissions: string[];
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (data: any) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  /**
   * 🔁 RESTORE SESSION ON REFRESH
   */
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("authUser");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  /**
   * ✅ LOGIN
   */
  const login = async (data: any) => {
    const res = await api.post("/platformUser/login", data);

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("authUser", JSON.stringify(res.data.user));
    setUser(res.data.user);

    router.push("/dashboard");
  };

  /**
   * ✅ LOGOUT
   */
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("authUser");

    setAuthToken(null);
    setUser(null);

    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
};
