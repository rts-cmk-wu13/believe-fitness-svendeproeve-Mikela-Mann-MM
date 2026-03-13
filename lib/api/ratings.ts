

import type { CreateRatingPayload, Rating } from "@/types";
import { apiFetch } from "./client";

export function getRatings(classId: number | string): Promise<Rating[]> {
    return apiFetch<Rating[]>(`/api/v1/classes/${classId}/ratings`);
}

export function createRating(classId: number | string, data: CreateRatingPayload, token?: string): Promise<Rating> {
    console.log("createRating URL:", `/api/v1/classes/${classId}/ratings`);
    console.log("createRating data:", data);
    return apiFetch(`/api/v1/classes/${classId}/ratings`, {
        method: "POST",
        token,
        body: JSON.stringify(data),
    });
}   
