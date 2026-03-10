

import { cookies } from "next/headers";
import type { Session } from "@/types";

const COOKIE_NAME =
  process.env.SESSION_COOKIE_NAME ?? "believe_fitness_session";

const REMEMBER_ME_DAYS = 30; // 30 dage


// ─── Cookie helpers (used in API route handlers) ─────────────────────────── //

export function encodeSession(session: Session): string {
  return btoa(JSON.stringify(session));
}

export function decodeSession(raw: string): Session | null {
  try {
    return JSON.parse(atob(raw)) as Session;
  } catch {
    return null;
  }
}

// ─── Session helpers ─────────────────────────────────────────────────────── //

export async function getSession(): Promise<Session | null> {
  const cookieStore = await cookies();
  const raw = cookieStore.get(COOKIE_NAME)?.value;
  
  if (!raw) return null;

  try {
    return JSON.parse(atob(raw)) as Session;
  } catch {
    return null;
  }
}

export async function setSession(session: Session): Promise<void> {
  const cookieStore = await cookies();

  cookieStore.set(COOKIE_NAME, encodeSession(session), {
    httpOnly: true,
    sameSite: "strict",
    path: "/", 
    secure: process.env.NODE_ENV === "production",
    ...(session.rememberMe
      ? { expires: new Date(Date.now() + REMEMBER_ME_DAYS * 24 * 60 * 60 * 1000) }
      : {}),
  });
}
 
export async function clearSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

// ─── Guard helpers ───────────────────────────────────────────────────────── //


export async function requireAuth(): Promise<Session | null> {
  return getSession();
}

export async function requireInstructor(): Promise<Session | null> {
  const session = await getSession();

  if (!session) return null;

  if (session.role !== "instructor" && session.role !== "admin") return null;

  return session;
}
