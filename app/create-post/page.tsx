import { redirect } from "next/navigation";
import PostForm from "@/components/PostForm";
import { getServerSession } from "next-auth/next";
import authOptions from "@/app/api/auth/[...nextauth]/options";

export default async function CreatePost() {
  const session = await getServerSession(authOptions);
  if (!session) return redirect(`/sign-in`);

  return <PostForm/>;
}