

import type { FitnessClass, FitnessClassSummary, UpdateClassPayload } from "@/types";
import { apiFetch } from "./client";

export function getClasses(): Promise<FitnessClassSummary[]> {
    return apiFetch<FitnessClassSummary[]>("/classes");
}

export function getClassesById(id: number | string): Promise<FitnessClass> {
    return apiFetch(`/classes/${id}`);
}

export function updateClass(id: number | string, data: UpdateClassPayload, token?: string): Promise<FitnessClass> {
    return apiFetch(`/classes/${id}`, {
        method: "PUT",
        token,
        body: JSON.stringify(data),
    });
}

export function deleteClass(id: number | string, token?: string ): Promise<void> {
    return apiFetch(`/classes/${id}`, {
        method: "DELETE",
        token,
    });
}

export function enrollInClass(classId: number | string, userId: number, token?: string): Promise<{ succes: boolean }> {
    return apiFetch<{ succes: boolean }>(`/classes/${classId}/signup`, {
        method: "POST",
        token,
        body: JSON.stringify({ userId }),
    });
}

export function leaveClass(classId: number | string, userId: number, token?: string): Promise<{ succes: boolean }> {
    return apiFetch<{ succes: boolean }>(`/classes/${classId}/signup`, {
        method: "DELETE",
        token,
        body: JSON.stringify({ userId }),
    });
}

