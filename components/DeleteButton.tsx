"use client";

export default function DeleteButton({ id }: { id: string }) {
  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this post ?")
    if (confirmed) {
      try {
        const response = await fetch(`/api/posts/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          }
        })
        if (!response.ok) {
          throw new Error(`Error on deleting post`);
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
  return <button onClick={handleDelete} className="text-red-600 editable-btns">Delete</button>;
}