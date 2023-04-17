import Footer from "components/Footer";
import Link from "next/link";
import React from "react";

function NotFoundPage() {
  return (
    <main className="grid h-[calc(100vh-140px)] min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-primary">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-2">
          <button className="btn-primary btn">
            <Link href="/">Go back home</Link>
          </button>
          <button className="btn-ghost btn">
            Contact support <span aria-hidden="true">&rarr;</span>
          </button>
        </div>
      </div>
      <div className="fixed bottom-0">
        <Footer />
      </div>
    </main>
  );
}

export default NotFoundPage;
