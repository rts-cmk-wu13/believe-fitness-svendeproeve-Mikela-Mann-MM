

"use client";

import { useActionState } from "react";
import { loginAction } from "@/lib/actions";
import { initialLoginState } from "@/types";
import type { LoginState } from "@/types";
import FormError from "@/components/ui/FormError";


export default function LoginForm() {
    const [state, formAction, isPending] = useActionState<LoginState, FormData>(
    loginAction,
    initialLoginState
);

    return (
        <form action={formAction} noValidate className="flex flex-col gap-4">
            <div>
                <input
                    type="text"
                    name="username"
                    defaultValue={state.values.username}
                    placeholder="Enter your email..."
                    className="form-input"
                    autoComplete="username"
                />
                <FormError message={state.errors.username} />
            </div>

            <div>
                <input
                    type="password"
                    name="password"
                    placeholder="Enter your password..."
                    className="form-input"
                    autoComplete="current-password"
                />

                <FormError message={state.errors.password} />
            </div>

            <FormError message={state.errors.general} />

            <button
                type="submit"
                disabled={isPending}
                className="btn-primary mt-2"
            >
                {isPending ? "Logging in…" : "LOG IN"}
            </button>
        </form>

    );
}