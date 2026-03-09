

import type { Asset } from "@/types";
import { apiFetch } from "./client";

export function getAssets(): Promise<Asset[]> {
    return apiFetch<Asset[]>("/assets");
}

export function getAssetByID(id: number | string): Promise<Asset> {
    return apiFetch(`/assets/${id}`);
}