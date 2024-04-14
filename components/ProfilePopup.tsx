"use client";
import Link from "next/link";
import { Session } from "next-auth";
import { TPopupLink } from "@/types";
import { signOut } from "next-auth/react";
import { useRef } from "react";

type TProfilePopupProps = {
  isPopupVisible: boolean;
  setIsPopupVisible: (value: boolean) => void;
  session: Session | null;
  popupLinks?: TPopupLink[];
};

export default function ProfilePopup({ isPopupVisible, setIsPopupVisible, session, popupLinks }: TProfilePopupProps) {
  const popupRef = useRef<HTMLDivElement | null>(null);
  return (
    <div
      className={`absolute z-30 right-0 top-20 bg-white p-3 shadow-md rounded-md text-right flex flex-col gap-3 min-w-[200px] ${
        isPopupVisible ? `flex` : `hidden`
      }`}
    >
      <div className="font-semibold text-lg">{session?.user?.name}</div>
      <div className="text-sm text-gray-500">{session?.user?.email}</div>
      <hr className="border-t border-gray-200 my-1.5" />
      {popupLinks && popupLinks?.map((item, index) => (
        <Link
        key={index}
        href={item?.link}
        onClick={() => setIsPopupVisible(false)}
        className="text-blue-600 hover:text-blue-800 hover:underline"
      >
        {item?.destination}
        </Link>
      ))}
      <button
        onClick={() => signOut()}
        className="px-4 py-2 rounded-md font-semibold transition duration-500 outline-none bg-red-500 text-white hover:bg-red-600"
      >
        Sign Out
      </button>
    </div>
  );
}