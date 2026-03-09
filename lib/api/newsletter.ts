
import type { NewsletterPayload } from "@/types";
import { apiFetch } from "./client";

type NewsletterResponse = {
    success: boolean;
    message?: string;
}

export function subscribeToNewsletter(data: NewsletterPayload): Promise<NewsletterResponse> {
    return apiFetch<NewsletterResponse>("/newsletter", {
        method: "POST",
        body: JSON.stringify(data),
    });
}