

"use client";

import { useState } from "react";
import { subscribeToNewsletter } from "@/lib/api/newsletter";
import FormError from "@/components/ui/FormError";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!email) return "E-mail is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return "Please enter a valid email address";
    return "";
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    const err = validate();
    if (err) { setError(err); return; }
    setError("");
    setLoading(true);
    try {
      await subscribeToNewsletter({ email });
      setSuccess(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <section className="content-wrapper py-10">
        <h2 className="text-2xl font-bold text-white mb-2">Sign up for our newsletter</h2>
        <p className="text-sm text-green-600 mt-2">
           You are now subscribed to our newsletter!
        </p>
      </section>
    );
  }

  return (
    <section className="content-wrapper py-8">
      <h2 className="text-lg font-bold text-black mb-2 pb-2">Sign up for our newsletter</h2>
      <p className="text-black/60 text-sm mb-5 leading-relaxed pb-3">
        Sign up to receive the latest news and announcements from Believe Fitness.
      </p>
      <form onSubmit={handleSubmit} noValidate>
        <div className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email..."
            className="form-input flex-1"
            aria-label="E-mail for newsletter"
          />
          <button
            type="submit"
            disabled={loading}
            className="btn-primary btn-primary--sm" 
          >
            {loading ? "…" : "SIGN UP"}
          </button>
        </div>
        <FormError message={error} />
      </form>
    </section>
  );
} 