import { posts } from "@/data"; 
import PostsList from "@/components/PostsList";
import CategoriesList from "@/components/CategoriesList";

export default function Home() {
  return (
    <>
      <CategoriesList />
      {posts && posts?.length > 0 ? (
        <PostsList posts={posts} />
      ) : (
        <div className="py-6">No posts to display!</div>
      )}
    </>
  );
}
