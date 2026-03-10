

"use server";

import { redirect } from "next/navigation";
import { loginUser } from "@/lib/api/auth";
import { setSession } from "@/lib/session";

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
    errors.username = "Brugernavn er påkrævet";

  if (!password) 
    errors.password = "Adgangskode er påkrævet";

  if (Object.keys(errors).length > 0) {
    return { 
      values: { username, password }, 
      errors 
    };
  }

  // API-kald
  let role: string;

  try {
    const auth = await loginUser(username, password);

    await setSession(
      { 
        userId: auth.userId, 
        token: auth.token,
        role: auth.role,
        validUntil: auth.validUntil,
        rememberMe, 
      },
      rememberMe
    );

    role = auth.role;
  } catch {
    return {
      values: { username, password },
      errors: { 
        general: "Forkert brugernavn eller adgangskode" 
      },
    };
  }

  // Redirect skal være udenfor try/catch
  redirect(role === "default" ? "/classes" : "/profile");
} 