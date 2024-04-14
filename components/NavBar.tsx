"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function NavBar() {
  const { status } = useSession();
  return (
    <nav className="flex justify-between pb-4  mb-4 border-b">
      <div>
        <Link href={`/`}>
          <h1 className="text-4xl font-bold tracking-tighter text-dark">
            Next Blog
          </h1>
        </Link>
        <p className="text-sm">
          Exploring Tomorrow&apos;s Innovations, <br /> One Byte at a Time
        </p>
      </div>
      <div className="flex items-center">
        {status === "authenticated" ? (
          <button onClick={() => signOut()} className="btn">
            Sign Out
          </button>
        ) : (
          <Link className="btn" href={`/sign-in`}>
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}
