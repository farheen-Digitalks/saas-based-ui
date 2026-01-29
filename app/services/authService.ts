import axios from "axios";
import { Endpoints } from "../API/configApi";
import api from "./api";

export type LoginCred = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
  user: {
    _id: string;
    email: string;
    isSuperAdmin: boolean;
    role?: string;
  };
};

export const loginUser = async (payload: LoginCred): Promise<LoginResponse> => {
  const res = await api.post<LoginResponse>(Endpoints.LOGIN, payload, {
    withCredentials: true, // important if you use cookies
  });

  return res.data;
};
