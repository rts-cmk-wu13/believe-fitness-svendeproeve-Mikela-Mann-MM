

import type { Asset } from "@/types";
import { apiFetch } from "./client";

export function getAssets(): Promise<Asset[]> {
    return apiFetch<Asset[]>("/api/v1/assets");
}

export function getAssetByID(id: number | string): Promise<Asset> {
    return apiFetch(`/api/v1/assets/${id}`);
}