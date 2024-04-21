import { TPost } from "@/types";
import PostsList from "@/components/PostsList";
import CategoriesList from "@/components/CategoriesList";

async function getPosts(): Promise<TPost[] | undefined> {
  try {
    let response = await fetch(`${process.env.NEXTAUTH_URL}/api/posts`, { cache: "no-store" });
    if (response.ok) {
      const responseData = await response.json();
      const { data } = responseData;
      if (!data || !Array.isArray(data)) {
        throw new Error("Invalid data format");
      }
      return data;
    }
  } catch (error) {
    console.error(error);
  }
}

export default async function Home() {
  const posts = (await getPosts()) || [];
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
