

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { createPortal } from "react-dom";
import { logoutAction } from "@/lib/actions";

interface NavMenuProps {
    isOpen: boolean;
    onClose: () => void;
    isLoggedIn: boolean;
}

interface NavItem {
    label: string;
    href: string;
    requiresAuth?: boolean;
    authOnly?: boolean;
}

const NAV_ITEMS: NavItem[] = [
    { label: "Home", href: "/home" },
    { label: "Popular Classes", href: "/classes" },
    { label: "Search", href: "/search" },
    { label: "My Profile", href: "/profile", requiresAuth: true },
    { label: "Log In", href: "/login", authOnly: true },
];

export default function NavMenu({ isOpen, onClose, isLoggedIn }: NavMenuProps) {
  const [appShell, setAppShell] = useState<HTMLElement | null>(null);
 
    useEffect(() => {
        setAppShell(document.getElementById("app-shell"));
    }, []);
 
    if (!isOpen || !appShell) return null;

    const items = NAV_ITEMS.filter(item => {
        if (item.requiresAuth && !isLoggedIn) return false;
        if (item.authOnly && isLoggedIn) return false;
        return true;
    });

 
    return createPortal(
        <div className="nav-overlay">
            {/* Close button */}
            <button
                type="button"
                onClick={onClose}
                aria-label="Close navigation menu"
                className="absolute top-5 right-6 text-(--grey-mid) cursor-pointer"
            >
                <X size={24} />
            </button>
            {/* Nav links */}
            <nav className="flex flex-col items-center gap-8">
                {items.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        onClick={onClose}
                        className="text-2xl font-medium text-(--brand-black) no-underline"
                    >
                        {item.label}
                    </Link>
                ))}

                {/* Log out (kun når logget ind) */}
                {isLoggedIn && (
                    <form action={logoutAction}>
                        <button
                            type="submit"
                            className="text-2xl font-medium text-(--brand-black) bg-transparent border-none cursor-pointer"
                        >
                            Log Out
                        </button>
                    </form>
                )}
            </nav>
        </div>,
        appShell
    );
}