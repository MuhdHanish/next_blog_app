"use client";

import { TPost } from "@/types";

export default function DeleteButton({ post }: { post: TPost }) {
  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this post ?")
    if (confirmed) {
      try {
        const postResponse = await fetch(`/api/posts/${post?.id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (postResponse.ok) {
          if (post?.publicId) {
            const imageResponse = await fetch(`/api/images/${post?.publicId}`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            });
            if (!imageResponse.ok) {
              throw new Error(`Error on deleting post image`);
            }
          }
        } else {
          throw new Error(`Error on deleting post`);
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
  return <button onClick={handleDelete} className="text-red-600 editable-btns">Delete</button>;
}