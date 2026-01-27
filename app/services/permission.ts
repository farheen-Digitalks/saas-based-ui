import { Endpoints } from "../API/configApi";
import api from "./api";

export type PermissionAction = {
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
};

export type Permission = {
  _id: string;
  name: string;
  module: string;
  action: PermissionAction;
  description?: string;
  companyId: string;
  createdAt?: string;
  updatedAt?: string;
};

export type CreatePermission = {
  name: string;
  module: string;
  action: PermissionAction;
  description?: string;
};

export type UpdatePermissionDto = Partial<CreatePermission>;

export const getPermissions = async (): Promise<Permission[]> => {
  try {
    const res = await api.get<Permission[]>(Endpoints.PERMISSION);
    return res.data;
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : "Login failed. Please try again.";
    console.error("getPermissions error:", err);
    throw new Error(errorMessage);
  }
};

export const getPermissionById = async (id: string): Promise<Permission> => {
  try {
    const res = await api.get<Permission>(`${Endpoints.PERMISSION}/${id}`);
    return res.data;
  } catch (err: unknown) {
    const error =
      err instanceof Error ? err.message : "Failed to load permission";
    throw new Error(error);
  }
};

export const createPermission = async (
  payload: CreatePermission,
): Promise<Permission> => {
  try {
    const res = await api.post<Permission>(Endpoints.PERMISSION, payload);
    return res.data;
  } catch (err: unknown) {
    const error =
      err instanceof Error ? err.message : "Failed to create permission";
    throw new Error(error);
  }
};

export const updatePermission = async (
  id: string,
  payload: UpdatePermissionDto,
): Promise<Permission> => {
  try {
    const res = await api.put<Permission>(
      `${Endpoints.PERMISSION}/${id}`,
      payload,
    );
    return res.data;
  } catch (err: unknown) {
    const error =
      err instanceof Error ? err.message : "Failed to update permission";
    throw new Error(error);
  }
};

export const deletePermission = async (id: string): Promise<void> => {
  try {
    await api.delete(`${Endpoints.PERMISSION}/${id}`);
  } catch (err: unknown) {
    const error =
      err instanceof Error ? err.message : "Failed to delete permission";
    throw new Error(error);
  }
};
