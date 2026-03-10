

import type { FitnessClass, FitnessClassSummary, UpdateClassPayload } from "@/types";
import { apiFetch } from "./client";

export function getClasses(): Promise<FitnessClassSummary[]> {
    return apiFetch<FitnessClassSummary[]>("/api/v1/classes");
}

export function getClassesById(id: number | string): Promise<FitnessClass> {
    return apiFetch(`/api/v1/classes/${id}`);
}

export function updateClass(id: number | string, data: UpdateClassPayload, token?: string): Promise<FitnessClass> {
    return apiFetch(`/api/v1/classes/${id}`, {
        method: "PUT",
        token,
        body: JSON.stringify(data),
    });
}

export function deleteClass(id: number | string, token?: string ): Promise<void> {
    return apiFetch(`/api/v1/classes/${id}`, {
        method: "DELETE",
        token,
    });
}

export function enrollInClass(classId: number | string, userId: number, token?: string): Promise<{ succes: boolean }> {
    return apiFetch<{ succes: boolean }>(`/api/v1/users/${userId}/classes/${classId}`, {
        method: "POST",
        token,
        body: JSON.stringify({ userId }),
    });
}

export function leaveClass(classId: number | string, userId: number, token?: string): Promise<{ succes: boolean }> {
    return apiFetch<{ succes: boolean }>(`/api/v1/users/${userId}/classes/${classId}`, {
        method: "DELETE",
        token,
        body: JSON.stringify({ userId }),
    });
}

