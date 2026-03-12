

// ─── API Response Types ────────────────────────────────────────────────────


export interface Asset {
  id: number;
  url: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface TrainerSummary {
  id: number;
  trainerName: string;
  createdAt?: string;
  updatedAt?: string;
  assetId?: number;
}


export interface User {
  id: number;
  username: string;
  userFirstName: string;
  userLastName: string;
  role?: "default" | "instructor" | "admin";
  createdAt?: string;
  updatedAt?: string;
}

export interface FitnessClassSummary {
  id: number;
  className: string;
  classDescription: string;
  classDay: string;
  classTime: string;
  maxParticipants: number;
  createdAt?: string;
  updatedAt?: string;
  trainerId: number;
  assetId: number;
}

export interface FitnessClass extends FitnessClassSummary {
  trainer?: TrainerSummary;
  asset?: Asset;
  users?: User[];
  ratings?: Rating[];
}

export interface Trainer {
  id: number;
  trainerName: string;
  createdAt?: string;
  updatedAt?: string;
  assetId?: number;
  asset?: Asset;
  class?: FitnessClassSummary;
}

export interface NewsItem {
  id: number;
  title: string;
  text: string;
  createdAt?: string;
  updatedAt?: string;
  assetId?: number;
  asset?: Asset;
}

export interface Testimonial {
  id: number;
  text: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Rating {
  id: number;
  userId: number;
  classId?: number;
  rating: number;
}





// ─── Auth Types ────────────────────────────────────────────────────────────

export type LoginPayload = {
  username: string;
  password: string;
  rememberMe?: boolean;
}

export interface AuthResponse {
  userId: number;
  token: string;
  role: "default" | "instructor" | "admin";
  validUntil: number;
}

export interface Session {
  userId: number;
  token: string;
  role: "default" | "instructor" | "admin";
  userFirstName: string;
  userLastName: string;
  username: string;
  validUntil?: number;
  rememberMe?: boolean;
}

export type AuthErrors = {
  username?: string;
  password?: string;
  general?: string;
}

// ─── Form Types ────────────────────────────────────────────────────────────

export type ContactPayload = {
  name: string;
  email: string;
  message: string;
}

export type NewsletterPayload = {
  email: string;
}

export type RegisterPayload = {
  username: string;
  password: string;
  userFirstName: string;
  userLastName: string;
}

export type CreateRatingPayload = {
  userId: number;
  rating: number;
} 

export type UpdateClassPayload = {
  id: number;
  className: string;
  classDescription: string;
  classDay: string;
  classTime: string;
  maxParticipants: number;
  trainerId: number;
  assetId: number;
}

export type ContactFormErrors = {
  name?: string;
  email?: string;
  message?: string;
  general?: string;
}

// ─── Component Props ───────────────────────────────────────────────────────

export interface SearchBarProps {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}

export interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
}

export interface ClassDetailPageProps {
  params: Promise<{ id: string }>;
}

export interface EnrollClassButtonProps {
  classId: number;
  initialEnrolled: boolean;
  onEnroll: (classId: number) => Promise<{ error?: string; success?: boolean }>;
  onLeave: (classId: number) => Promise<{ error?: string; success?: boolean }>;
}

// type - til simple shapes, unions, og utility-typer vs interface - til ting der beskriver en "kontrakt" (form states, API responses, klasser)