

"use client";

import { useState } from "react";
import { sendMessage } from "@/lib/api/message";
import { reportError } from "@/lib/reportError";  
import FormError from "@/components/ui/FormError";
import { ContactFormErrors } from "@/types";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = (): ContactFormErrors => {
    const e: ContactFormErrors = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "E-mail is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Invalid e-mail";
    if (!form.message.trim()) e.message = "Message is required";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    try {
      await sendMessage(form);
      setSuccess(true);
    } catch (err) {
      /* reportError(err, { form });  */ // skal rettes til senere !!!!
      setErrors({ general: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  if (success) {
    return (
      <section className="content-wrapper--narrow py-10">
        <h2 className="text-2xl font-bold text-white mb-2">Contact us</h2>
        <p className="text-green-600 font-medium text-sm">✓ Thank you for your message! We will get back to you soon.</p>
      </section>
    );
  }

  return (
    <section className="content-wrapper--narrow py-10">
      <h2 className="text-white text-2xl mb-6 pb-6">Contact us</h2>
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-2">
        <div>
          <input className="form-input" placeholder="Name" value={form.name} onChange={set("name")} />
          <FormError message={errors.name} />
        </div>
        <div>
          <input className="form-input" type="email" placeholder="Email" value={form.email} onChange={set("email")} />
          <FormError message={errors.email} />
        </div>
        <div>
          <textarea
            className="form-input resize-none"
            placeholder="Message"
            rows={4}
            value={form.message}
            onChange={set("message")}
          />
          <FormError message={errors.message} />
        </div>
        <FormError message={errors.general} />
        <div className="flex justify-center mt-2">
          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
            style={{ width: "15rem", height: "3.3125rem" }}
          >
            {loading ? "Sending…" : "Send Message"}
          </button>
        </div>
      </form>
    </section>
  );
} 