

"use client";

import { useActionState } from "react";
import { contactAction } from "@/lib/actions";
import FormError from "@/components/ui/FormError";
import type { ContactFormState } from "@/types";

const initialContactState: ContactFormState = {
  errors: {},
  success: false,
};

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    contactAction,
    initialContactState)

  if (state.success) {
    return (
      <section className="content-wrapper--narrow py-10">
        <h2 className="text-2xl font-bold text-white mb-2">Contact us</h2>
        <p role="status" className="text-green-600 font-medium text-sm">Thank you for your message! We will get back to you soon.</p>
      </section>
    );
  }

  return (
    <section className="content-wrapper--narrow py-10">
      <h2 className="text-black text-2xl mb-6 pb-6">Contact us</h2>
      <p className="text-black/60 text-sm mb-5 leading-relaxed pb-3">Ask us anything about Believe Fitness!</p>
      <form action={formAction} noValidate className="flex flex-col gap-2">

        <div>
          <input
            id="name"
            name="name"
            className="form-input"
            placeholder="Enter your name..."
            aria-describedby={state.errors.name ? "name-error" : undefined}
            aria-invalid={!!state.errors.name}
          />
          <FormError message={state.errors.name} />
        </div>

        <div>
          <input
            id="email"
            name="email"
            className="form-input"
            placeholder="Enter your email..."
            type="email"
            aria-describedby={state.errors.email ? "email-error" : undefined}
            aria-invalid={!!state.errors.email}
          />
          <FormError message={state.errors.email} />
        </div>

        <div>
          <textarea
            id="message"
            name="message"
            className="form-input resize-none"
            placeholder="Enter your message..."
            rows={4}
            aria-describedby={state.errors.message ? "message-error" : undefined}
            aria-invalid={!!state.errors.message}
          />
          <FormError message={state.errors.message} />

        </div>
        <FormError message={state.errors.general} aria-live="polite" />
        <div className="flex justify-center mt-2">
          <button
            type="submit"
            disabled={isPending}
            aria-disabled={isPending}
            className="btn-primary w-60 h-13.25"
          >
            {isPending ? "Sending…" : "Send Message"}
          </button>
        </div>
      </form>
    </section>
  );
} 