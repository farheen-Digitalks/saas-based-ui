// services/employee/employee.ts
import { Endpoints } from "@/app/API/configApi";
import api from "../api";

// services/employee/employee.ts
export type Employee = {
  _id: string;          // from Mongo
  name: string;
  email: string;
  role: string;         // currently role id
  companyId?: string;   // optional, if you need it
};


export const getEmployees = async (): Promise<Employee[]> => {
  try {
    const res = await api.get<Employee[]>(Endpoints.GET_EMPLOYEES);
    console.log("Response", res.data);
    return res.data;
  } catch (err) {
    console.error("Error fetching employees:", err);
    throw err; // let caller handle the error
  } finally {
    // optional: logging, metrics, etc.
  }
};
