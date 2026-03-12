

import Link from "next/link";
import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  
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
<div aria-labelledby="signup-heading">
  <h2 id="signup-heading" className="text-xl font-bold mb-6">
    Create your account
  </h2>
  <RegisterForm />
</div>

{/* Login link */}

        <p className="text-sm text-center mt-8 text-(--grey-mid)">
          Already a Believer?{" "}
          <Link 
          href="/login" 
          className="text-(--grey-mid) underline"
          aria-label="Log in here"
          >
            Log in here
          </Link>
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