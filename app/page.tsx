import Post from "@/components/Post";
import CategoriesList from "@/components/CategoriesList";
import { posts } from "@/data";

export default function Home() {
  return (
    <>
      <CategoriesList />
      {posts && posts?.length > 0 ? (
        posts?.map((post) => (<Post key={post?.id} postData={post}/>))
      ) : (
        <div>No posts to display!</div>
      )}
    </>
  );
}
