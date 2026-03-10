

import { LoginPayload, AuthResponse, User } from "@/types";
import { apiFetch } from "./client";

export async function loginUser(data: LoginPayload): Promise<AuthResponse> {
    return apiFetch("/auth/token", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getUser(userId: number, token: string): Promise<User> {
  return apiFetch(`/api/v1/users/${userId}`, {
    method: "GET",
    token,
  });
}

/* export async function logoutUser(token: string): Promise<void> {
  return apiFetch("/api/v1/auth/logout", {
    method: "POST",
    token,
  });
} */