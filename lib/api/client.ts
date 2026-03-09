

import { ApiError } from "@/lib/errors";

const BASE_URL =
    process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

// ─── Generic fetch helper ──────────────────────────────────────────────────

type FetchOptions = RequestInit & {
    token?: string;
};

export async function apiFetch<T>(
    path: string,
    options?: FetchOptions
): Promise<T> {
    const { token, headers, body, ...rest } = options ?? {};

    const res = await fetch(`${BASE_URL}${path}`, {
        ...rest,
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...headers,
        },

        // Automatisk stringify hvis body er et objekt
        body:
            body && typeof body === "object"
                ? JSON.stringify(body)
                : body,

        cache: "no-store", // Undgå caching for at sikre frisk data og korrekt auth-håndtering
    });

    const contentType = res.headers.get("Content-Type") ?? "";
    let responseBody: unknown = null;

    if (res.status !== 204) {
      if (contentType.includes("application/json")) {
        responseBody = await res.json();
    } else {
        responseBody = await res.text();
    }
}

    if (!res.ok) {
        throw new ApiError(res.status, responseBody === "string" ? responseBody : "Request failed");
    }
    return responseBody as T;
}
