"use client";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";

export default function NavBar() {
  const { status, data: session } = useSession();
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
          // <button onClick={() => signOut()} className="btn">
          //   Sign Out
          // </button>
          <>
            <div className="flex gap-2 items-center">
              <Link className="flex gap-1.5 items-center mr-6" href={`/create-post`}>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm.75-10.25v2.5h2.5a.75.75 0 0 1 0 1.5h-2.5v2.5a.75.75 0 0 1-1.5 0v-2.5h-2.5a.75.75 0 0 1 0-1.5h2.5v-2.5a.75.75 0 0 1 1.5 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <span>Create Post</span>
              </Link>
              <Image
                src={
                  session?.user?.image ||
                  "https://cdn.create.vista.com/api/media/small/356209164/stock-vector-user-avatar-illustration-anonymous-sign"
                }
                alt="Profile Image"
                className="rounded-sm"
                width={36}
                height={36}
              />
            </div>
          </>
        ) : (
          <Link className="btn" href={`/sign-in`}>
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}
