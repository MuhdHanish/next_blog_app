import { request } from "@/utils";
import { TRequestProps, TPost } from "@/types";
import PostsList from "@/components/PostsList";
import NoDataFound from "@/components/NoDataFound";
import CategoriesList from "@/components/CategoriesList";

export default async function Home() {
  const options: TRequestProps = {
    url: `/posts`,
    returnType: "array",
    method: "GET",
  };
  const posts = (await request(options)) as TPost[] | undefined;
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
