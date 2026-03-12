

import Link from "next/link";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  
  return (
    <main className="content-wrapper py-12 flex flex-col min-h-dvh"
    aria-labelledby="page-title">

      {/* Brand */}
      <div className="mb-10" role="banner">
        <h1
        id="page-title"
        className="text-6xl font-black leading-none mb-2 text-(--brand-yellow)">
          Believe
          <br /> 
          Fitness
        </h1>
        <div className="flex items-center gap-3" aria-hidden="true">
          <span className="block h-px w-6 bg-(--brand-black)" />
<p>Train like a pro</p>
          </div>
        </div>
        
  
{/* Form */}
<section aria-labelledby="login-heading">
  <h2 id="login-heading" className="text-xl font-bold mb-6">
    Log in with your credentials
  </h2>
  <LoginForm />
</section>

{/* Sign up link */}

        <p className="text-sm text-center mt-8 text-(--grey-mid)">
          Are you not yet a Believer?{" "}
          <Link 
          href="/register" 
          className="text-(--grey-mid) underline"
          aria-label="Sign up to start training like a pro"
          >
            Sign up here
          </Link>{" "}
          to start training like a pro
        </p>

<div>
        <label className="flex items-center justify-center gap-2 mt-5 text-(--grey-mid) text-[0.8rem] cursor-pointer --font-body">
          <input type="checkbox" name="rememberMe" />
          Remember Me
        </label>
      </div>
    </main>
  );
} 