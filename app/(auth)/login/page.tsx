

import Link from "next/link";
import LoginForm from "@/components/auth/LoginForm";

interface Props {
  searchParams: Promise<{ registered?: string }>;
}

export default async function LoginPage({ searchParams }: Props) {
  const { registered } = await searchParams;

  return (
    <main className="content-wrapper py-12 flex flex-col min-h-dvh"
    aria-labelledby="page-title">

      {registered && (
        <p className="text-sm text-center mb-4" style={{ color: "#16a34a" }}>
          Account created! You can now log in.
        </p>
      )}

      {/* Brand */}
      <div className="mb-12" role="banner">
        <h1
        id="page-title"
        className="text-6xl font-black leading-none mb-2 text-(--brand-yellow) pl-7.5">
          Believe
          <br /> 
          Fitness
        </h1>
        <div className="flex items-center gap-3 pt-6" aria-hidden="true">
          <span className="block h-0.5 w-6 bg-(--brand-black)" />
<p className="font-bold text-base">Train like a pro</p>
          </div>
        </div>
        
  
{/* Form */}
<section aria-labelledby="login-heading">
  <h2 id="login-heading" className="text-md font-bold mb-6 pt-10 pb-5">
    Log in with your credentials
  </h2>
  <LoginForm />
</section>

{/* Remember me */}
        <label className="flex items-center justify-center gap-2 mt-5 text-(--grey-mid) text-sm cursor-pointer --font-body pt-3 pb-2">
          <input type="checkbox" name="rememberMe" />
          Remember Me
        </label>
      

{/* Sign up link */}

        <p className="text-sm text-center mt-8 text-(--grey-mid)">
          Are You not yet a Believer?{" "}
          <br />
          <Link 
          href="/register" 
          className="text-(--grey-mid) underline"
          aria-label="Sign up to start training like a pro"
          >
            Sign up here
          </Link>{" "}
          to start training like a pro
        </p>

    </main>
  );
} 