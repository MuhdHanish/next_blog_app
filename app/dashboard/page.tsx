export const revalidate = 0;

import Link from "next/link";
import { TPost } from "@/types";
import { redirect } from "next/navigation";
import PostsList from "@/components/PostsList";
import { getServerSession } from "next-auth/next";
import NoDataFound from "@/components/NoDataFound";
import { authOptions } from "../api/auth/[...nextauth]/route";

async function findUserWithPostsByEmail(email: string): Promise<TPost[] | undefined> {
  try {
    let response = await fetch(`${process.env.NEXTAUTH_URL}/api/users/${email}`, { cache: "no-store" });
    if (response.ok) {
      const responseData = await response.json();
      const { data } = responseData;
      const { posts } = data;
      if (!posts || !Array.isArray(posts)) {
          throw new Error(`Invalid data format\nReceived: ${JSON.stringify(posts, null, 2)}`);
      }
      return posts;
    } else {
      throw new Error(`Request failed, HTTP Status Code : ${response.status}`);
    }
  } catch (error) {
    console.error(error);
  }
}


export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session) return redirect(`/sign-in`);
  let posts:TPost[] = [];
  const email = session?.user?.email;
  if(email) posts = (await findUserWithPostsByEmail(email)) || [];
  return (
    <div>
      <h1>My Posts</h1>
      {posts && posts?.length > 0 ? (
        <PostsList posts={posts} />
      ) : (
        <NoDataFound>
          No posts created yet! {" "}
          <Link className="underline" href={`/create-post`}>Create Post</Link>
        </NoDataFound>
      )}
    </div>
  );
}