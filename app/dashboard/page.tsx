import Link from "next/link";
import { TPost } from "@/types";
import { redirect } from "next/navigation";
import PostsList from "@/components/PostsList";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";

async function getUserPostsWithEmail(email: string): Promise<TPost[] | undefined> {
  try {
    let response = await fetch(`${process.env.NEXTAUTH_URL}/api/users/${email}`, { cache: "no-store" });
    if (response.ok) {
      const responseData = await response.json();
      const { data } = responseData;
      const { posts } = data;
      if (!posts || !Array.isArray(posts)) {
        throw new Error("Invalid data format");
      }
      return posts;
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
  if(email) posts = (await getUserPostsWithEmail(email) || []);
  return (
    <div>
      <h1>My Posts</h1>
      {posts && posts?.length > 0 ? (
        <PostsList posts={posts} />
      ) : (
          <div className="py-6">
            No posts created yet! {" "}
            <Link className="underline" href={`/create-post`}>Create Post</Link>
          </div>
      )}
    </div>
  );
}
