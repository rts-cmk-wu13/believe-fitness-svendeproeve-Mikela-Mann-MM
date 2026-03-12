

"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getSession, setSession, clearSession } from "./session";
import { loginUser, getUser } from "./api/auth";
import { registerUser } from "./api/users";
import {
  createClass,
  enrollInClass,
  leaveClass,
  deleteClass,
  updateClass,
} from "@/lib/api/classes";
import { createRating } from "./api/ratings"
import { sendMessage } from "./api/message";
import { reportError } from "./reportError";
import type {
  LoginState,
  RegisterState,
  CreateClassState,
  ContactFormState,
  UpdateClassPayload,
  CreateRatingPayload,
  ContactFormErrors,
} from "@/types/index";

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

function validateClass(
  values: CreateClassState["values"]
): CreateClassState["errors"] {
  const e: CreateClassState["errors"] = {};
  if (!values.className.trim()) e.className = "Class name is required";
  return e;
}

function parseClassFormData(formData: FormData): CreateClassState["values"] {
  return {
    className: (formData.get("className") as string) ?? "",
    classDescription: (formData.get("classDescription") as string) ?? "",
    classDay: (formData.get("classDay") as string) ?? "Monday",
    classTime: (formData.get("classTime") as string) ?? "09:00",
    maxParticipants: Number(formData.get("maxParticipants")) || 12,
    trainerId: Number(formData.get("trainerId")) || 0,
    assetId: Number(formData.get("assetId")) || 1,
  };
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
    console.log("API response:", res);
    const user = await getUser(res.userId, res.token);
    console.log("User:", user);
    await setSession({
      userId: res.userId,
      token: res.token,
      role: res.role,
      validUntil: res.validUntil,
      rememberMe: false,
      userFirstName: user.userFirstName,
      userLastName: user.userLastName,
      username: user.username,
    },);console.log("Session set");
  } catch {
    console.log("Error");
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
    reportError(err, values.username);
    return {
      values,
      errors: { general: "Could not create account. Username may already be taken." },
    };
  }

  redirect("/login?registered=true");
}

// ─── Classes ────────────────────────────────────────────────────────────────

export async function enrollAction(classId: number): Promise<ActionResult> {
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

export async function leaveAction(classId: number): Promise<ActionResult> {
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

export async function createClassAction(
  prevState: CreateClassState,
  formData: FormData
): Promise<CreateClassState> {
  const values = parseClassFormData(formData);
  const errors = validateClass(values);
  if (Object.keys(errors).length > 0) return { values, errors };

  try {
    const session = await requireSession();
    requireInstructor(session.role);
    await createClass(values, session.token);
  } catch (err) {
    reportError(err, "createClassAction");
    return { values, errors: { general: "Could not create class. Please try again." } };
  }

  revalidatePath("/profile");
  redirect("/profile");
}

export async function updateClassActionState(
  prevState: CreateClassState,
  formData: FormData
): Promise<CreateClassState> {
  const values = parseClassFormData(formData);
  const errors = validateClass(values);
  if (Object.keys(errors).length > 0) return { values, errors };

  const classId = Number(formData.get("id"));

  try {
    const session = await requireSession();
    requireInstructor(session.role);
    await updateClass(classId, { id: classId, ...values }, session.token);
    revalidatePath("/profile");
    revalidatePath(`/classes/${classId}`);
  } catch (err) {
    reportError(err, "updateClassActionState");
    return { values, errors: { general: "Could not update class. Please try again." } };
  }

  redirect("/profile");
}

// ─── Contact ────────────────────────────────────────────────────────────────


export async function contactAction(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  const errors: ContactFormErrors = {};
  if (!name.trim()) errors.name = "Name is required";
  if (!email.trim()) errors.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = "Invalid e-mail";
  if (!message.trim()) errors.message = "Message is required";

  if (Object.keys(errors).length) return { errors, success: false };

  try {
    await sendMessage({ name, email, message });
    return { errors: {}, success: true };
  } catch (err) {
    reportError(err, "contactAction");
    return {
      errors: { general: "Something went wrong. Please try again" },
      success: false,
    };
  }
}