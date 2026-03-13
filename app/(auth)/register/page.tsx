

import Link from "next/link";
import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  
  return (
    <main className="content-wrapper py-12 flex flex-col min-h-dvh"
    aria-labelledby="page-title">

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
<div aria-labelledby="signup-heading">
  <h2 id="signup-heading" className="text-md font-bold mb-6 pt-10 pb-5">
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
          

    </main>
  );
} 