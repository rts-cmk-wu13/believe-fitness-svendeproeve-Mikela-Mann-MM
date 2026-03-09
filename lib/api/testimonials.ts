
import type { Testimonial } from "@/types";
import { apiFetch } from "./client";

export function getTestimonials(): Promise<Testimonial[]> {
    return apiFetch<Testimonial[]>("/testimonials");
}   