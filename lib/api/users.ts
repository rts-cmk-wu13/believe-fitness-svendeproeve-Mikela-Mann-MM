
import type { User, RegisterPayload } from "@/types";
import { apiFetch } from "./client";

export function getUsers(): Promise<User[]> {
    return apiFetch("/users");
}

export function getUserById(id: number | string, token?: string): Promise<User> {
    return apiFetch(`/api/v1/users/${id}`, { token });
}

export function registerUser(data: RegisterPayload): Promise<User> {
    return apiFetch<User>("/api/v1/users", {
        method: "POST",
        body: JSON.stringify(data),
    });
}