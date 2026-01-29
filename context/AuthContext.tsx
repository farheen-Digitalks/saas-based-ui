"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import api from "@/app/services/api";
import { LoginCred, loginUser } from "@/app/services/authService";
import { Endpoints } from "@/app/API/configApi";

type User = {
  _id: string;
  email: string;
  isSuperAdmin: boolean;
  name?: string;
  role?: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (data: LoginCred) => Promise<void>;
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
  const login = async (data: LoginCred) => {
    const res = await loginUser(data);
    console.log("Login data", res);

    localStorage.setItem("token", res.token);
    localStorage.setItem("authUser", JSON.stringify(res.user));
    // Cookies.set("token", res.token);

    setUser(res.user);

    if (res.user?.isSuperAdmin) {
      router.push("/superadmin");
    } else {
      router.push("/dashboard");
    }
  };

  /**
   * ✅ LOGOUT
   */
  const logout = async () => {
    await api.post(Endpoints.LOGOUT, {}, { withCredentials: true });

    localStorage.removeItem("token");
    localStorage.removeItem("authUser");

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
