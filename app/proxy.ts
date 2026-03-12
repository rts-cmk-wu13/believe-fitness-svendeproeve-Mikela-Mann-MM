

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { Session } from "@/types";

const COOKIE_NAME =
  process.env.SESSION_COOKIE_NAME ?? "believe_fitness_session";

const PROTECTED_PATHS = ["/profile"];
const AUTH_PATHS = ["/login", "/register"];
const INSTRUCTOR_PATHS = ["/create-class"];

function getSession(req: NextRequest) {
  const raw = req.cookies.get(COOKIE_NAME)?.value;
  if (!raw) return null;
  try {
    return JSON.parse(atob(raw)) as Session;
  } catch {
    return null;
  }
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const session = getSession(req);
  const isLoggedIn = Boolean(session);

  // Redirect loggede brugere væk fra auth-sider → aktiviteter
  if (isLoggedIn && AUTH_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.redirect(new URL("/profile", req.url));
  }

  // Redirect ikke-loggede brugere fra beskyttede sider → login
  if (!isLoggedIn && PROTECTED_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Redirect ikke-instruktører fra instruktør-sider → profil
  if (INSTRUCTOR_PATHS.some((p) => pathname.startsWith(p))) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    if (session?.role !== "instructor" && session?.role !== "admin") {
      return NextResponse.redirect(new URL("/profile", req.url));
    }

  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/register",
    "/profile",
    "/profile/:path*",
    "/create-class",
    "/create-class/:path*",
  ],
}; 