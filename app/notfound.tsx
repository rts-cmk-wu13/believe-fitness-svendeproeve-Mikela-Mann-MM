

import Link from "next/link";

export default function NotFound() {
  return (
    <main className="content-wrapper flex flex-col items-center justify-center min-h-dvh text-center">
      <h1 className="text-6xl font-black text-(--brand-yellow) mb-2">
        404
      </h1>
      <p className="text-lg font-bold mb-2">Page not found</p>
      <p className="text-(--grey-dark) text-sm mb-8">
        The page you where looking for does not exist or has been moved. Please check the URL or return to the homepage.
      </p>
      <Link href="/home" className="btn-primary w-auto px-8">
        GO HOME
      </Link>
    </main>
  );
}