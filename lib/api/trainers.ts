
import type { Trainer, TrainerSummary } from "@/types";
import { apiFetch } from "./client";    

export function getTrainers(): Promise<TrainerSummary[]> {
    return apiFetch<TrainerSummary[]>("/api/v1/trainers");
}

export function getTrainerByID(id: number | string): Promise<Trainer> {
    return apiFetch(`/api/v1/trainers/${id}`);
}