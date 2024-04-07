import Link from "next/link";
import { posts } from "@/data";
import PostsList from "@/components/PostsList";

export default function Dashboard() {
  return (
    <div>
      <h1>My Posts</h1>
      {posts && posts?.length > 0 ? (
        <PostsList posts={posts} />
      ) : (
          <div className="py-6">
            No posts created yet!
            <Link href={`/create-post`}>Create Post</Link>
          </div>
      )}
    </div>
  );
}
