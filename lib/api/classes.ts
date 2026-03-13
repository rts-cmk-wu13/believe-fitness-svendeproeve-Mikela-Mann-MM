

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

export function createClass(data: Omit<UpdateClassPayload, "id">, token?: string): Promise<FitnessClass> {
    return apiFetch("/api/v1/classes", {
        method: "POST",
        token,
        body: JSON.stringify(data),
    });
}

export async function uploadAsset(file: File, token?: string): Promise<{ id: number }> {
    const formData = new FormData();
    formData.append("file", file);
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000"}/api/v1/assets`, {
        method: "POST",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: formData,
    });
    
    if (!res.ok) throw new Error("Asset upload failed");
    return res.json();
}