

import type { CreateRatingPayload, Rating } from "@/types";
import { apiFetch } from "./client";

export function getRatings(): Promise<Rating[]> {
    return apiFetch<Rating[]>("/ratings");
}

export function createRating(data: CreateRatingPayload, token?: string): Promise<Rating> {
    return apiFetch("/ratings", {
        method: "POST",
        token,
        body: JSON.stringify(data),
    });
}   
