import { posts } from "@/data";
import PostsList from "@/components/PostsList";

export default function Dashboard() {
  return (
    <div>
      <h1>My Posts</h1>
      <PostsList posts={posts} />
    </div>
  );
}
