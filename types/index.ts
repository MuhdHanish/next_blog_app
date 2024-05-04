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
  author: { name: string };
  authorEmail?: string;
  title: string;
  content: string;
  categoryTitle?: string;
  createdAt: string;
  links?: string[];
  publicId?: string;
  thumbnail?: string;
};

export type TCategory = {
  id: string;
  title: string;
};

export type TRequestProps = {
  data?: any;
  url: string;
  keyName?: string;
  isClient?: boolean;
  returnType?: "array" | "object";
  setError?: (error: any) => void;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
};

export type TImageHandlerProps = {
  setThumbnail: (value: string) => void;
  thumbnail: string;
  setPublicId: (value: string) => void;
  publicId: string;
  setError?: (value: string) => void;
  alt: string;
};