"use client";
import Image from "next/image";
import { TSingInButton } from "@/types";
import { signIn } from "next-auth/react";

type TSingInButtonProps = TSingInButton;

export default function SignInButton({ provider, text, imageSrc, altText }: TSingInButtonProps) {
  const handleSignIn = () => {
    signIn(provider);
  };
  return (
    <button onClick={handleSignIn} className="signup-btns">
      <span>
        <Image
          src={imageSrc}
          width={30}
          height={30}
          alt={altText}
        />
      </span>
      {text}
    </button>
  );
};
