import { request } from "@/utils";
import { TPost, TRequestProps } from "@/types";
import PostsList from "@/components/PostsList";
import NoDataFound from "@/components/NoDataFound";

type TRequestParams = {
  title: string;
};

export default async function CategoryPosts({
  params,
}: {
  params: TRequestParams;
}) {
  const { title } = params;
  const options: TRequestProps = {
    url: `/categories/${title}`,
    keyName: "posts",
    returnType: "array",
    method: "GET",
  };
  const posts = (await request(options)) as TPost[] | undefined;
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
