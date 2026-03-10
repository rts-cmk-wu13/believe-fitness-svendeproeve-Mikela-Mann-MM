
import { ContactPayload } from "@/types";
import { apiFetch } from "./client";

export function sendMessage(data: ContactPayload): Promise<{ success: boolean; message?: string }>  {
    return apiFetch<{ success: boolean; message?: string }>("/api/v1/message", {
        method: "POST",
        body: JSON.stringify(data),
    });
}