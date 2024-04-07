import { TPost } from "@/types";
import Post from "./Post";

type TPostsListProps = {
  posts: TPost[];
};

export default function PostsList({ posts }: TPostsListProps) {
  return posts?.map((post) => <Post key={post?.id} post={post} />)
}
