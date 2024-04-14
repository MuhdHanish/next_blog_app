"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { TPopupLink } from "@/types";
import ProfilePopup from "./ProfilePopup";
import { useSession } from "next-auth/react";

const popupLinks: TPopupLink[] = [
  { link: `/dashboard`, destination: `Dashboard` },
  { link: `/create-post`, destination: `Create Post` },
];

export default function NavBar() {
  const { status, data: session } = useSession();
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  return (
    <nav className="flex justify-between pb-4  mb-4 border-b relative">
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
          <>
            <ProfilePopup session={session} isPopupVisible={isPopupVisible} setIsPopupVisible={setIsPopupVisible} popupLinks={popupLinks}/>
            <div className="flex gap-2 items-center">
              <Link
                className="hidden md:flex gap-1.5 items-center mr-5"
                href={`/create-post`}
              >
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.7}
                    stroke="currentColor"
                    className="w-[18px] h-[18px]"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
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
                onClick={() => setIsPopupVisible((prev) => !prev)}
                alt="Profile Image"
                className="rounded-sm cursor-pointer"
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
