import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import PostForm from "@/components/PostForm";

export default async function CreatePost() {
  const session = await getServerSession(authOptions);
  if (!session) return redirect(`/sign-in`);

  return <PostForm/>;
}