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
  companyId: string;
};

export type UpdatePermissionDto = Partial<CreatePermission>;

export const getPermissions = async (): Promise<Permission[]> => {
  try {
    const res = await api.get<Permission[]>(Endpoints.PERMISSION);
    return res.data;
  } catch (error: any) {
    console.error("getPermissions error:", error?.response || error);
    throw new Error(
      error?.response?.data?.message || "Failed to fetch permissions",
    );
  } finally {
    // optional: logging/metrics
  }
};

export const getPermissionById = async (id: string): Promise<Permission> => {
  try {
    const res = await api.get<Permission>(`${Endpoints.PERMISSION}/${id}`);
    return res.data;
  } catch (error: any) {
    console.error("getPermissionById error:", error?.response || error);
    throw new Error(
      error?.response?.data?.message || "Failed to fetch permission",
    );
  } finally {
  }
};

export const createPermission = async (
  payload: CreatePermission,
): Promise<Permission> => {
  try {
    const res = await api.post<Permission>(Endpoints.PERMISSION, payload);
    return res.data;
  } catch (error: any) {
    console.error("createPermission error:", error?.response || error);
    throw new Error(
      error?.response?.data?.message || "Failed to create permission",
    );
  } finally {
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
  } catch (error: any) {
    console.error("updatePermission error:", error?.response || error);
    throw new Error(
      error?.response?.data?.message || "Failed to update permission",
    );
  } finally {
  }
};

export const deletePermission = async (id: string): Promise<void> => {
  try {
    await api.delete(`${Endpoints.PERMISSION}/${id}`);
  } catch (error) {
    console.error("deletePermission error:", error);
    throw error;
  } finally {
  }
};
