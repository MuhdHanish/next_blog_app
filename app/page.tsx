import { posts } from "@/data"; 
import PostsList from "@/components/PostsList";
import CategoriesList from "@/components/CategoriesList";

export default function Home() {
  return (
    <>
      <CategoriesList />
      <PostsList posts={posts}/>
    </>
  );
}
