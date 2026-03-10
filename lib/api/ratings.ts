

import type { CreateRatingPayload, Rating } from "@/types";
import { apiFetch } from "./client";

export function getRatings(classId: number | string): Promise<Rating[]> {
    return apiFetch<Rating[]>(`/api/v1/classes/${classId}/ratings`);
}

export function createRating(classId: number | string, data: CreateRatingPayload, token?: string): Promise<Rating> {
    return apiFetch(`/api/v1/classes/${classId}/ratings`, {
        method: "POST",
        token,
        body: JSON.stringify(data),
    });
}   
