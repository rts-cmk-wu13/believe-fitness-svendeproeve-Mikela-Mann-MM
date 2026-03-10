

"use server";

import { redirect } from "next/navigation";
import { loginUser, getUser } from "@/lib/api/auth";
import { setSession } from "@/lib/session";
import { getUserById } from "@/lib/api/users";

export type LoginState = {
  values: { username: string; password: string };
  errors: { username?: string; password?: string; general?: string };
};

export async function loginAction(
  prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const username = String(formData.get("username") ?? "");
  const password = String(formData.get("password") ?? "");
  const rememberMe = formData.get("rememberMe") === "on";

  // Validering
  const errors: LoginState["errors"] = {};

  if (!username.trim()) 
    errors.username = "Username is required";

  if (!password) 
    errors.password = "Password is required";

  if (Object.keys(errors).length > 0) {
    return { 
      values: { username, password }, 
      errors 
    };
  }

  // API-kald
  let role: string;

  try {
    const auth = await loginUser({ username, password });
    const user = await getUserById(auth.userId, auth.token);

    await setSession(
      { 
        userId: auth.userId, 
        token: auth.token,
        role: auth.role,
        validUntil: auth.validUntil,
        userFirstName: user.userFirstName ?? "",
        userLastName: user.userLastName ?? "",
        username: user.username,
        rememberMe, 
      });

    role = auth.role;
  } catch {
    return {
      values: { username, password },
      errors: { 
        general: "Incorrect username or password" 
      },
    };
  }

  // Redirect skal være udenfor try/catch
  redirect(role === "default" ? "/classes" : "/profile");
} 