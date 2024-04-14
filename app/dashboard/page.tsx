import Link from "next/link";
import { posts } from "@/data";
import { redirect } from "next/navigation";
import PostsList from "@/components/PostsList";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session) return redirect(`/sign-in`);

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
