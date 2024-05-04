export const dynamic = "force-dynamic";

import { request } from "@/utils";
import { redirect } from "next/navigation";
import PostForm from "@/components/PostForm";
import { TRequestProps, TPost } from "@/types";
import { getServerSession } from "next-auth/next";
import NoDataFound from "@/components/NoDataFound";
import { authOptions } from "../../api/auth/[...nextauth]/route";

type TRequestParams = {
  id: string;
};

export default async function EditPost({ params }: { params: TRequestParams }) {
  const session = await getServerSession(authOptions);
  if (!session) return redirect(`/sign-in`);
  const { id } = params;
  const options: TRequestProps = {
    url: `/posts/${id}`,
    returnType: "object",
    method: "GET",
  };
  const post = (await request(options)) as TPost | undefined;
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
