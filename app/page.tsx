export const revalidate = 0;

import { TPost } from "@/types";
import PostsList from "@/components/PostsList";
import NoDataFound from "@/components/NoDataFound";
import CategoriesList from "@/components/CategoriesList";

async function findPosts(): Promise<TPost[] | undefined> {
  try {
    let response = await fetch(`${process.env.NEXTAUTH_URL}/api/posts`, { cache: "no-store" });
    if (response.ok) {
      const responseData = await response.json();
      const { data } = responseData;
      if (!data || !Array.isArray(data)) {
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

export default async function Home() {
  const posts = (await findPosts()) || [];
  return (
    <>
      <CategoriesList />
      {posts && posts?.length > 0 ? (
        <PostsList posts={posts} />
      ) : (
        <NoDataFound>No posts to display!</NoDataFound>
      )}
    </>
  );
}
