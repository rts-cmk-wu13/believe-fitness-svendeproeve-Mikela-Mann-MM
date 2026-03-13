

"use client"

import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import NavMenu from "./NavMenu";
import { ChevronLeft } from "lucide-react";

interface HeaderProps {
  isLoggedIn: boolean;
}

const pageTitles: Record<string, string> = {
  "/classes": "Popular classes",
  "/search": "Search",
  "/profile": "My Profile",
  "/login": "Log in",
  "/register": "Register",
};


export default function Header({ isLoggedIn }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const router = useRouter();

  const isHome = pathname === "/" || pathname === "/home";
  const isHero = isHome || /^\/classes\/\d+$/.test(pathname);
  const isLargeTitle = pathname === "/classes" || pathname === "/profile";
  const pageTitle = pageTitles[pathname] ?? "";


  return (
    <>
      <header className={`site-header ${isHero ? "is-home" : ""}`}>
        {isHome || isLargeTitle ? (
          <span /> /* tom placeholder så burgermenu forbliver til højre */
        ) : (
          <button
            type="button"
            onClick={() => router.back()}
            aria-label="Go back"
            className={`flex items-center justify-center w-8 h-8 ${isHero ? "text-white" : ""}`}
          >
            <ChevronLeft size={24} strokeWidth={2.5} />

          </button>
        )}

        {!isHome && !isLargeTitle && pageTitle && (
          <span className="text-lg font-normal absolute left-1/2 -translate-x-1/2">
            {pageTitle}
          </span>
        )}

        {isLargeTitle && (
          <span className="text-2xl font-normal absolute left-6">
            {pageTitles[pathname]}
          </span>
        )}

        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          className="flex flex-col justify-between w-5.25 h-3.75"
        >
          <span className={`block h-0.75 w-full rounded-full ${isHero ? "bg-white" : "bg-[#9e9e9e]"}`} />
          <span className={`block h-0.75 w-full rounded-full ${isHero ? "bg-white" : "bg-[#9e9e9e]"}`} />
          <span className={`block h-0.75 w-[55%] rounded-full self-end  ${isHero ? "bg-white" : "bg-[#9e9e9e]"}`} />
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

