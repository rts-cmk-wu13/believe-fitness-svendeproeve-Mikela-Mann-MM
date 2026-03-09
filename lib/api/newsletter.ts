
import type { NewsletterPayload } from "@/types";
import { apiFetch } from "./client";

export function subscribeToNewsletter(data: NewsletterPayload) {
    return apiFetch("/newsletter", {
        method: "POST",
        body: JSON.stringify(data),
    });
}