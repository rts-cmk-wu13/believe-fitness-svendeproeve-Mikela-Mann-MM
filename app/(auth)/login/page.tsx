

import Link from "next/link";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  
  return (
    <main className=""
    aria-labelledby="page-title">

      {/* Brand */}
      <div className="mb-10" role="banner">
        <h1
        id="page-title"
        className="">
          Believe
          <br /> 
          Fitness
        </h1>
        <div>
          <span />
<p>Train like a pro</p>
          </div>
        </div>
        
  
{/* Form */}
<section>
  <h2>
    Log in with your credentials
  </h2>
  <LoginForm />
</section>

{/* Sign up link */}

        <p className="">
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