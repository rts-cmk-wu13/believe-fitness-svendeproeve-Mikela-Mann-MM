

import { LoginPayload, AuthResponse } from "@/types";
import { apiFetch } from "./client";

export async function loginUser(data: LoginPayload): Promise<AuthResponse> {
    return apiFetch("/auth/token", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

/* export async function logoutUser(token: string): Promise<void> {
  return apiFetch("/api/v1/auth/logout", {
    method: "POST",
    token,
  });
} */