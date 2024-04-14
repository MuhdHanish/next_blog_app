import { signIn } from "next-auth/react";

type SignInFunctionParameters = Parameters<typeof signIn>;
type ProviderParameter = SignInFunctionParameters[0];

export type TSingInButton = {
  provider: ProviderParameter;
  text: string;
  imageSrc: string;
  altText: string;
};

export type TPopupLink = {
  link: string;
  destination: string;
};

export type TPost = {
  id: string;
  author: string;
  authorEmail?: string;
  title: string;
  content: string;
  category?: string;
  datePublished: string;
  links?: string[];
  thumbnail?: string;
};
