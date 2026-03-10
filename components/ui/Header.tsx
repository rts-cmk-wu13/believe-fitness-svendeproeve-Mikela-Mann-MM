

"use client"

import Link from "next/link";
import { useState } from "react";
import NavMenu from "./NavMenu";

interface HeaderProps {
  isLoggedIn: boolean;
}

export default function Header({ isLoggedIn }: HeaderProps) {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);

  return (
    <>
    <header className="site-header">
      {/*   <Link 
        href="/home"
        className="no-underline"
        aria-label="Believe Fitness - go to home"
        >
            
           <span className="text-xl font-black tracking-tight leading-none font-(--font-body) text-(--brand-yellow)">
            Believe
            <br />
            <span className="text-(--brand-black)">Fitness</span>
           </span>
        </Link> */}

        <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="flex flex-col justify-center gap-1.5 w-8 h-8"
        >
            <span className="block h-0.5 w-full rounded-full bg-[var(--brand-black)]" />
            <span className="block h-0.5 w-full rounded-full bg-[var(--brand-black)]" />
            <span className="block h-0.5 w-full rounded-full bg-[var(--brand-black)]" />
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

