import Link from "next/link";
import { request } from "@/utils";
import { redirect } from "next/navigation";
import PostsList from "@/components/PostsList";
import { TRequestProps, TPost } from "@/types";
import { getServerSession } from "next-auth/next";
import NoDataFound from "@/components/NoDataFound";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session) return redirect(`/sign-in`);
  const email = session?.user?.email;
  const options: TRequestProps = {
    url: `/users/${email}`,
    keyName: "posts",
    returnType: "array",
    method: "GET",
  };
  const posts = (await request(options)) as TPost[] | undefined;
  return (
    <div>
      <h1>My Posts</h1>
      {posts && posts?.length > 0 ? (
        <PostsList posts={posts} />
      ) : (
        <NoDataFound>
          No posts created yet!{" "}
          <Link className="underline" href={`/create-post`}>
            Create Post
          </Link>
        </NoDataFound>
      )}
    </div>
  );
}
