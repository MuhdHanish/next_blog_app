"use client";
import { toast } from "sonner";
import { TPost } from "@/types";
import { format, request } from "@/utils";
import { useRouter } from "next/navigation";

export default function DeleteButton({ post }: { post: TPost }) {
  const router = useRouter();
  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this post ?")
    if (confirmed) {
      try {
        await request({ method: "DELETE", url: `/posts/${post?.id}`, isClient: true })
        const description = format();
        toast("Post has been deleted", { description });
      } catch (error) {
        toast.error("Post has not been deleted");
      }
      post?.publicId && await request({ method: "DELETE", url: `/images/${post?.publicId}`, isClient: true });
      router.refresh();
    }
  }
  return <button onClick={handleDelete} className="text-red-600 editable-btns">DELETE</button>;
}