

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

// ─── State-typer til useActionState ────────────────────────────────────────────────────────────────

export interface LoginState {
  values: { username: string; password: string };
  errors: { username?: string; password?: string; general?: string };
}

export interface RegisterState {
  values: {
    firstname: string;
    lastname: string;
    username: string;
    password: string;
    passwordConfirm: string;
  };
  errors: {
    firstname?: string;
    lastname?: string;
    username?: string;
    password?: string;
    passwordConfirm?: string;
    general?: string;
  }
}

export const initialLoginState: LoginState = {
  values: { username: "", password: "" },
  errors: {},
};

export const initialRegisterState: RegisterState = {
  values: {
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    passwordConfirm: "",
  },
  errors: {},
};

// ─── Validering ───────────────────────────────────────────────────────────────

function validateRegister(
  values: RegisterState["values"]
): RegisterState["errors"] {
  const e: RegisterState["errors"] = {};

  if (!values.firstname.trim()) e.firstname = "First name is required";
  if (!values.lastname.trim()) e.lastname = "Last name is required";

  if (!values.username.trim()) e.username = "Username is required";
  else if (values.username.length < 3)
    e.username = "Username must be at least 3 characters";

  if (!values.password) e.password = "Password is required";
  else if (values.password.length < 6)
    e.password = "Password must be at least 6 characters";

  if (values.password !== values.passwordConfirm)
    e.passwordConfirm = "Passwords do not match";

  return e;
}


// ─── Auth ────────────────────────────────────────────────────────────────

export async function loginAction(
  prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const values = {
    username: (formData.get("username") as string) ?? "",
    password: (formData.get("password") as string) ?? "",
  };

   if (!values.username.trim())
    return { values, errors: { username: "Username is required" } };
  if (!values.password)
    return { values, errors: { password: "Password is required" } };


 try {
    const res = await loginUser({ username: values.username, password: values.password });
    const user = await getUser(res.userId, res.token);
    await setSession({
      userId: res.userId,
      token: res.token,
      role: res.role,
      validUntil: res.validUntil,
      rememberMe: false,
      userFirstName: user.userFirstName,
      userLastName: user.userLastName,
      username: user.username,
    });
  } catch {
    return { values, errors: { general: "Invalid username or password" } };
  }

  redirect("/profile");
}

export async function logoutAction(): Promise<void> {
  await clearSession();
  redirect("/");
}

export async function registerAction(
  prevState: RegisterState,
  formData: FormData
): Promise<RegisterState> {
  const values: RegisterState["values"] = {
    firstname: (formData.get("firstname") as string) ?? "",
    lastname: (formData.get("lastname") as string) ?? "",
    username: (formData.get("username") as string) ?? "",
    password: (formData.get("password") as string) ?? "",
    passwordConfirm: (formData.get("passwordConfirm") as string) ?? "",
  };

  const errors = validateRegister(values);
  if (Object.keys(errors).length > 0) return { values, errors };

  try {
    await registerUser({
      userFirstName: values.firstname,
      userLastName: values.lastname,
      username: values.username,
      password: values.password,
    });
  } catch (err) {
    reportError(err, values.username );
    return {
      values,
      errors: { general: "Could not create account. Username may already be taken." },
    };
  }

  redirect("/login?registered=true");
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