export const dynamic = "force-dynamic";

import { TPost } from "@/types";
import { redirect } from "next/navigation";
import PostForm from "@/components/PostForm";
import { getServerSession } from "next-auth/next";
import NoDataFound from "@/components/NoDataFound";
import { authOptions } from "../../api/auth/[...nextauth]/route";

type TRequestParams = {
  id: string;
};

async function findPostById(id: string): Promise<TPost | undefined> {
  try {
    let response = await fetch(`${process.env.NEXTAUTH_URL}/api/posts/${id}`, { cache: "no-store" });
    if (response.ok) {
      const responseData = await response.json();
      const { data } = responseData;
      if (!data) {
        throw new Error(`Invalid data format\nReceived: ${JSON.stringify(data, null, 2)}`);
      }
      return data;
    } else {
      throw new Error(`Request failed, HTTP Status Code : ${response.status}`);
    }
  } catch (error) {
    console.error(error);
  }
}

export default async function EditPost({ params }: { params: TRequestParams }) {
  const session = await getServerSession(authOptions);
  if (!session) return redirect(`/sign-in`);
  const { id } = params;
  const post = (await findPostById(id)) || undefined;
  return (
    <>
      {post ? (
        <PostForm post={post} />
      ) : (
        <NoDataFound>Post not available!</NoDataFound>
      )}
    </>
  );
}
