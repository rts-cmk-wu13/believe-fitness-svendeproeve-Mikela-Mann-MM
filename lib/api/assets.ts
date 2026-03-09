

import { apiFetch } from "./client";

export function getAssets() {
    return apiFetch("/assets");
}