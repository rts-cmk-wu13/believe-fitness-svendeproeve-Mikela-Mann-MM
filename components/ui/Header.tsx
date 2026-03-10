

"use client"

import Link from "next/link";
import { useState } from "react";
/* import NavMenu from "./NavMenu"; */

interface HeaderProps {
  isLoggedIn: boolean;
}

export default function Header({ isLoggedIn }: HeaderProps) {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);

  return (
    <>
    <header className="site-header">
        <Link href="/home">
            <h1 className="text-2xl font-bold">Believe Fitness</h1>
        </Link>
    </header>
    </>
  );
}

// ikke færdigt 