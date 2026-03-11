

"use server";

import { redirect } from "next/navigation"; 
import { revalidatePath } from "next/cache"; 
import { getSession, setSession, clearSession } from "./session";
import { loginUser, getUser } from "./api/auth";
import { registerUser } from "./api/users";
import {
  enrollInClass,
  leaveClass,
  deleteClass,
  updateClass,
} from "@/lib/api/classes";
import { createRating } from "./api/ratings"
import { reportError } from "./reportError";
import type {
  LoginPayload,
  RegisterPayload,
  UpdateClassPayload,
  CreateRatingPayload,
} from "@/types";

// ─── Helpers ─────────────────────────────────────────────────────────────────

type ActionResult = { error?: string };

async function requireSession() {
  const session = await getSession();
  if (!session) throw new Error("Not logged in");
  return session;
}

function requireInstructor(role: string) {
  if (role !== "instructor" && role !== "admin")
    throw new Error("Unauthorized");
}

// ─── Auth ────────────────────────────────────────────────────────────────

export async function loginAction(
  payload: LoginPayload
): Promise<ActionResult> {
  try {
    const res = await loginUser(payload);
    const user = await getUser(res.userId, res.token);
    await setSession(
      {
        userId: res.userId,
        token: res.token,
        role: res.role,
        validUntil: res.validUntil,
        rememberMe: payload.rememberMe ?? false,
        userFirstName: user.userFirstName,
        userLastName: user.userLastName,
        username: user.username,
      });
  } catch {
    return { error: "Invalid username or password" };
  }

  redirect("/profile");
}

export async function logoutAction(): Promise<void> {
  await clearSession();
  redirect("/");
}

export async function registerAction(
  payload: RegisterPayload
): Promise<ActionResult> {
  try {
    await registerUser(payload);
  } catch {
    return { error: "Could not create account. Username may already be taken." };
  }

  redirect("/login");
}


// ─── Classes ────────────────────────────────────────────────────────────────

export async function enrollAction(classId: number): Promise<ActionResult>{
  try {
    const session = await requireSession();
    await enrollInClass(classId, session.userId, session.token);
    revalidatePath(`/classes/${classId}`);
    revalidatePath("/profile");
    return {};
  } catch (err) {
    reportError(err, "enrollAction");
    return { error: "Could not sign up for class" };
  }
}

export async function leaveAction(classId: number): Promise<ActionResult>  {
  try {
    const session = await requireSession();
    await leaveClass(classId, session.userId, session.token);
    revalidatePath(`/classes/${classId}`);
    revalidatePath("/profile");
    return {};
  } catch (err) {
    reportError(err, "leaveAction");
    console.log("leaveAction error:", err);
    return { error: "Could not leave class" };
  }
}

export async function rateAction(
  classId: number,
  payload: CreateRatingPayload
): Promise<ActionResult> {
  try {
    const session = await requireSession();
    await createRating(classId, payload, session.token);
    revalidatePath(`/classes/${classId}`);
    return {};
  } catch (err) {
    reportError(err, "rateAction");
    return { error: "Could not save rating" };
  }
}

export async function deleteClassAction(
  classId: number
): Promise<ActionResult> {
  try {
    const session = await requireSession();
    requireInstructor(session.role);
    await deleteClass(classId, session.token);
    revalidatePath("/profile");
    return {};
  } catch (err) {
    reportError(err, "deleteClassAction");
    return { error: "Could not delete class" };
  }
}


export async function updateClassAction(
  classId: number,
  payload: UpdateClassPayload
): Promise<ActionResult> {
  try {
    const session = await requireSession();
    requireInstructor(session.role);
    await updateClass(classId, payload, session.token);
    revalidatePath("/profile");
    revalidatePath(`/classes/${classId}`);
    return {};
  } catch (err) {
    reportError(err, "updateClassAction");
    return { error: "Could not update class" };
  }
}