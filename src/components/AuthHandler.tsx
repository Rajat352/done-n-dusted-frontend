"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import SignIn from "./SignIn";

export default function AuthHandler() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black dark:border-white mb-4"></div>
        <p className="text-black dark:text-white">Loading...</p>
      </div>
    );
  }

  if (!session) {
    return <SignIn />;
  }

  if (session.user.syncStatus === undefined) {
    return (
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black dark:border-white mb-4"></div>
        <p className="text-black dark:text-white">Setting up your account...</p>
      </div>
    );
  }

  if (!session.user.syncStatus) {
    return (
      <div className="text-center">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 mb-4">
          <h3 className="text-red-800 dark:text-red-200 font-medium mb-2">
            Could not sync with database
          </h3>
          <p className="text-red-600 dark:text-red-300 text-sm mb-4">
            Please click below to Log Out and try again.
          </p>
          <button
            onClick={() => signOut()}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors hover:cursor-pointer"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <Link href="/tasks">
      <div className="hover:cursor-pointer flex gap-3 bg-landingSignInButtonLight dark:bg-landingSignInButtonDark p-4 rounded-full hover:opacity-80 transition-opacity">
        <div className="text-black dark:text-white">Go to Tasks</div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          width={20}
          height={20}
          className="text-black dark:text-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
          />
        </svg>
      </div>
    </Link>
  );
}
