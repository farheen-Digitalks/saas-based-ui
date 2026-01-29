import { Endpoints } from "@/app/API/configApi";
import api from "../api";

export type CreateTrial = {
  name: string;
  email: string;
  company_name: string;
  company_email: string;
  message: string;
};

export type Trial = {
  _id: string;
  name: string;
  email: string;
  company_name: string;
  company_email: string;
  message: string;
  status: string,
  createdAt?: string;
  updatedAt?: string;
};

export const createTrialRequest = async (
  payload: CreateTrial,
): Promise<Trial> => {
  try {
    const res = await api.post<Trial>(Endpoints.REQUEST_TRIAL, payload);
    return res.data;
  } catch (err) {
    const error = err instanceof Error ? err.message : "Failed to create trial";
    throw new Error(error);
  }
};

export const getTrialRequests = async (): Promise<Trial[]> => {
  try {
    const res = await api.get<Trial[]>(Endpoints.GET_REQUEST);
    return res.data?.requests;
  } catch (err) {
    throw new Error(
      err instanceof Error ? err.message : "Failed to load trial requests",
    );
  }
};
