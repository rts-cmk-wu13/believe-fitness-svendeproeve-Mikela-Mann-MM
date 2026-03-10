

"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { logout } from "@/lib/actions/auth";

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
    if (!isOpen) return null;

    const items = NAV_ITEMS.filter(item => {
        if (item.requiresAuth && !isLoggedIn) return false;
        if (item.authOnly && isLoggedIn) return false;
        return true;
    });

    return (
        <div className="nav-overlay">
            {/* Close button */}
            <button
                type="button"
                onClick={onClose}
                aria-label="Close navigation menu"
                className="absolute top-5 right-6 text-[var(--grey-mid)] cursor pointer"
            >
                <X size={24} />
            </button>
            {/* Nav links */}
            <nav className="flex flex-com item-center gap-8">
                {items.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        onClick={onClose}
                        className="text-2xl font-medium text-[var(--brand-black)] no-underline"
                    >
                        {item.label}
                    </Link>
                ))}

                {/* Log out (kun når logget ind) */}
                {isLoggedIn && (
                    <form action={logout}>
                        <button
                            type="submit"
                            className="text-2xl font-medium text-[var(--brand-black)] bg-transparent border-none cursor-pointer"
                        >
                            Log Out
                        </button>
                    </form>
                )}
            </nav>
        </div>
    );
}