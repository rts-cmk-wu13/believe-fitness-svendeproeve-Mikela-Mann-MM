
import { ContactPayload } from "@/types";
import { apiFetch } from "./client";

export function sendMessage(data: ContactPayload) {
    return apiFetch("/message", {
        method: "POST",
        body: JSON.stringify(data),
    });
}