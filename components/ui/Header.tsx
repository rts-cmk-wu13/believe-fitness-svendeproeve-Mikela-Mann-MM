

"use client"

import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import NavMenu from "./NavMenu";

interface HeaderProps {
  isLoggedIn: boolean;
}

const pageTitles: Record<string, string> = {
    "/classes": "Classes",
    "/search": "Search",
    "/profile": "Profile",
    "/login": "Log in",
    "/register": "Register",
};

 
export default function Header({ isLoggedIn }: HeaderProps) {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const pathname = usePathname();
    const router = useRouter();
 
    const isHome = pathname === "/" || pathname === "/home";
    const pageTitle = pageTitles[pathname] ?? "";


   return (
        <>
             <header className={`site-header ${isHome ? "is-home" : ""}`}>
                {isHome ? (
                    <span /> /* tom placeholder så burgermenu forbliver til højre */
                ) : (
                    <button
                        type="button"
                        onClick={() => router.back()}
                        aria-label="Go back"
                        className="flex items-center justify-center w-8 h-8"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M15 18l-6-6 6-6" />
                        </svg>
                    </button>
                )}

         {!isHome && pageTitle && (
                    <span className="text-xl font-black absolute left-1/2 -translate-x-1/2">
                        {pageTitle}
                    </span>
                )}

         <button
                    type="button"
                    onClick={() => setMenuOpen(true)}
                    aria-label="Open menu"
                    className="flex flex-col justify-between w-[21px] h-[15px]"
                >
                    <span className={`block h-[3px] w-full rounded-full ${isHome ? "bg-white" : "bg-[#9e9e9e]"}`} />
                    <span className={`block h-[3px] w-full rounded-full ${isHome ? "bg-white" : "bg-[#9e9e9e]"}`} />
                    <span className={`block h-[3px] w-[55%] rounded-full self-end  ${isHome ? "bg-white" : "bg-[#9e9e9e]"}`} />
                </button>
    </header>

<NavMenu 
isOpen={menuOpen} 
onClose={() => setMenuOpen(false)} 
isLoggedIn={isLoggedIn} 
/>

    </>
  );
}

