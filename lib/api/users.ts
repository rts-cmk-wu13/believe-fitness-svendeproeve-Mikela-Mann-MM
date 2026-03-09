
import type { User, RegisterPayload } from "@/types";
import { apiFetch } from "./client";

export function getUsers(): Promise<User[]> {
    return apiFetch("/users");
}

export function getUserById(id: number | string): Promise<User> {
    return apiFetch(`/users/${id}`);
}

export function registerUser(data: RegisterPayload): Promise<User> {
    return apiFetch<User>("/users", {
        method: "POST",
        body: JSON.stringify(data),
    });
}