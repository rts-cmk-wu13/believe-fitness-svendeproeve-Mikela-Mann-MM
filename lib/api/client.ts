

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
  const { token, headers, ...rest } = options ?? {};

  const res = await fetch(`${BASE_URL}${path}`, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
    },
    cache: "no-store", // Undgå caching for at sikre frisk data og korrekt auth-håndtering
  });

   if (contentType.includes("application/json")) {
    responseBody = await res.json();
  } else {
    responseBody = await res.text();
  }

  if (!res.ok) {
    throw new ApiError(res.status, responseBody === "string" ? responseBody : "Request failed" );
  }
  return responseBody as T;
}
