import { TPost } from "@/types/TPost";
import Post from "./Post";

type TPostsListProps = {
  posts: TPost[];
};

export default function PostsList({ posts }: TPostsListProps) {
  return posts && posts?.length > 0 ? (
    posts?.map((post) => <Post key={post?.id} post={post} />)
  ) : (
    <div>No posts to display!</div>
  );
}
