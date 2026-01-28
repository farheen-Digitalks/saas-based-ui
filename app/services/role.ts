import { Endpoints } from "../API/configApi";
import api from "./api";

export type Role = {
  _id: string;
  name: string;
  permissions: string[]; // array of Permission ObjectIds (or populated docs if you populate)
  description?: string;
  isActive: boolean;
  companyId: string;
  createdAt?: string;
  updatedAt?: string;
};

export type CreateRoleDto = {
  name: string;
  permissions: string[]; // permission ids
  description?: string;
  isActive?: boolean;
};

export type UpdateRoleDto = Partial<CreateRoleDto>;

export const getRoles = async (): Promise<Role[]> => {
  try {
    const res = await api.get<Role[]>(Endpoints.ROLES);
    return res.data?.data;
  } catch (err: unknown) {
    const error = err instanceof Error ? err.message : "Failed to load roles";
    throw new Error(error);
  } finally {
    // optional logging/metrics
  }
};

export const getRoleById = async (id: string): Promise<Role> => {
  try {
    const res = await api.get<Role>(`${Endpoints.ROLES}/${id}`);
    return res.data;
  } catch (err: unknown) {
    const error =
      err instanceof Error ? err.message : "Failed to load role by ID";
    throw new Error(error);
  } finally {
  }
};

export const createRole = async (payload: CreateRoleDto): Promise<Role> => {
  try {
    const res = await api.post<Role>(Endpoints.ROLES, payload);
    return res.data;
  } catch (err: unknown) {
    const error = err instanceof Error ? err.message : "Failed to create roles";
    throw new Error(error);
  } finally {
  }
};

export const updateRole = async (
  id: string,
  payload: UpdateRoleDto,
): Promise<Role> => {
  try {
    const res = await api.put<Role>(`${Endpoints.ROLES}/${id}`, payload);
    return res.data;
  } catch (err: unknown) {
    const error = err instanceof Error ? err.message : "Failed to update roles";
    throw new Error(error);
  } finally {
  }
};

export const deleteRole = async (id: string): Promise<void> => {
  try {
    await api.delete(`${Endpoints.ROLES}/${id}`);
  } catch (err: unknown) {
    const error = err instanceof Error ? err.message : "Failed to delete roles";
    throw new Error(error);
  } finally {
  }
};
