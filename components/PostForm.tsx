"use client";
import { toast } from "sonner";
import { format, request } from "@/utils";
import { useRouter } from "next/navigation";
import { TPost, TRequestProps } from "@/types";
import { useState, useTransition } from "react";
import { Links, Cloudinary, TextInput, TextAreaInput, SubmitButton, FormError, CategoryField } from "./FormComponents";

export default function PostForm({ post }: { post?: TPost | undefined }) {
  const router = useRouter();
  const [isPending, startTransaction] = useTransition();

  const [error, setError] = useState("");
  const [title, setTitle] = useState(post?.title || "");
  const [content, setContent] = useState(post?.content || "");
  const [publicId, setPublicId] = useState(post?.publicId || "");
  const [thumbnail, setThumbnail] = useState(post?.thumbnail || "");
  const [categoryTitle, setCategoryTitle] = useState(post?.categoryTitle || "");

  const [links, setLinks] = useState<string[]>(post?.links || []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!title || !content) return setError("Title & Content Are Required");
    startTransaction(async () => {
      try {
        const data = { title, content, links, categoryTitle, thumbnail, publicId,};
        const options: TRequestProps = {
          method: post ? "PUT" : "POST",
          url: post ? `/posts/${post?.id}` : `/posts`,
          data,
          isClient: true,
        };
        await request(options);
        const description = format();
        toast.message(`Post has been ${post ? 'updated' : 'created'}`, { description });
        router.push(`/dashboard`);
        router.refresh();
      } catch (error) {
        setError(`Failed to ${post ? 'update' : 'create'} post`);
      }
    });
  };
  return (
    <div>
      <h2>{post ? "Edit" : "Create"} Post</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <TextInput value={title} setValue={setTitle} placeholder="Title" />
        <TextAreaInput value={content} setValue={setContent} placeholder="Content" />
        <Links links={links} setLinks={setLinks} />
        <Cloudinary setThumbnail={setThumbnail} thumbnail={thumbnail} setPublicId={setPublicId} publicId={publicId} alt={title} setError={setError} />
        <CategoryField categoryTitle={categoryTitle} setCategoryTitle={setCategoryTitle} />
        <SubmitButton isPending={isPending}>
          {isPending ? `Please Wait` : `${post ? "Update" : "Create"} Post`}
        </SubmitButton>
        <FormError error={error} />
      </form>
    </div>
  );
}
