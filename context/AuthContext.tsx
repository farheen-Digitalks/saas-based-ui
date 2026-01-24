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
  register: (data: any) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  /**
   * 🔁 Called ONLY when user is null (refresh / direct access)
   */
  const fetchUser = async () => {
    try {
      const res = await api.get("/auth/me");
      setUser(res.data.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  /**
   * ✅ LOGIN
   * - Uses login response user
   * - DOES NOT call /auth/me
   */
  const login = async (data: any) => {
    const res = await api.post("/platformUser/login", data);
    console.log("Login response", res);

    localStorage.setItem("token", res.data.token); // 🔥 MISSING
    setUser(res.data.user);

    // setUser(res.data.user); // immediate state
    setLoading(false);

    router.push("/dashboard");
  };

  /**
   * ✅ REGISTER
   */
  const register = async (data: any) => {
    await api.post("/register", data);
    router.push("/login");
  };

  /**
   * ✅ LOGOUT
   */
  const logout = async () => {
    await api.post("/logout"); // clears cookies
    setUser(null);
    router.push("/login");
  };

  /**
   * 🔥 IMPORTANT FIX
   * Call /auth/me ONLY if user is null
   */
  useEffect(() => {
    // if (!user) {
    //   fetchUser();
    // } else {
    //   setLoading(false);
    // }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
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
