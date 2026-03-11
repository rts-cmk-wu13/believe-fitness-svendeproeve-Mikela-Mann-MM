

"use client";

import { useActionState } from "react";
import { registerAction, initialRegisterState, RegisterState } from "@/lib/actions";
import FormError from "@/components/ui/FormError";




export default function RegisterForm() {
const [state, formAction, isPending] = useActionState<RegisterState, FormData>(
  async (prev, formData) => registerAction(prev, formData),
  initialRegisterState
);

  return (
        <form action={formAction} noValidate className="flex flex-col gap-4">
          <div>
            <input 
            name="firstname"
            type="text" 
            placeholder="First name..." 
            defaultValue={state.values.firstname}
            className="form-input" 
            autoComplete="given-name" 
            />
            <FormError message={state.errors.firstname} />
          </div>

          <div>
            <input 
            name="lastname"
            type="text" 
            placeholder="Last name..." 
            defaultValue={state.values.lastname}
            className="form-input" 
            autoComplete="family-name" 
            />
            <FormError message={state.errors.lastname} />
          </div>

          <div>
            <input 
            name="username"
            type="text" 
            placeholder="Username..." 
            defaultValue={state.values.username}
            className="form-input" 
            autoComplete="username" 
            />
            <FormError message={state.errors.username} />
          </div>

          <div>
            <input 
            name="password"
            type="password" 
            placeholder="Password..." 
            className="form-input" 
            autoComplete="new-password" 
            />
            <FormError message={state.errors.password} />
          </div>

           <div>
            <input 
            name="passwordConfirm"
            type="password" 
            placeholder="Confirm password..." 
            className="form-input" 
            autoComplete="new-password" 
            />
            <FormError message={state.errors.passwordConfirm} />
          </div>

          <FormError message={state.errors.general} />

            <button type="submit" disabled={isPending} className="btn-primary mt-2">
              {isPending ? "Creating account…" : "SIGN UP"}
            </button>
        </form>
  );
}