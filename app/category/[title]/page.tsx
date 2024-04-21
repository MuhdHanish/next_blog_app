export const dynamic = "force-dynamic";

import { TPost } from "@/types";
import PostsList from "@/components/PostsList";
import NoDataFound from "@/components/NoDataFound";

type TRequestParams = {
  title: string;
};

async function findCategoryWithPostsByTitle(title: string): Promise<TPost[] | undefined> {
  try {
    let response = await fetch(`${process.env.NEXTAUTH_URL}/api/categories/${title}`, { cache: "no-store" });
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

export default async function CategoryPosts({ params }: { params: TRequestParams }) {
  const { title } = params;
  const posts = (await findCategoryWithPostsByTitle(title)) || undefined;
  return (
    <>
      <h1>
        <span className="font-normal">Category :</span>{" "}
        {decodeURIComponent(title)}
      </h1>
      {posts && posts?.length > 0 ? (
        <PostsList posts={posts} />
      ) : (
        <NoDataFound>No posts to display!</NoDataFound>
      )}
    </>
  );
}
