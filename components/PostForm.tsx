"use client";
import Link from "next/link";
import { TCategory, TPost } from "@/types";
import { useRouter } from "next/navigation";
import { CldUploadButton, CloudinaryUploadWidgetInfo, CloudinaryUploadWidgetResults } from "next-cloudinary";
import { ChangeEvent, MouseEventHandler, useEffect, useMemo, useState, useTransition } from "react";
import Image from "next/image";

export default function PostForm({ post }: { post?: TPost | undefined }) {
  const router = useRouter();
  const [isSubmittingForm, setIsSbumittingFormTransaction] = useTransition();
  const [isRemovingImage, setIsRemoveImageTransaction] = useTransition();

  const [error, setError] = useState("");
  const [title, setTitle] = useState(post?.title || "");
  const [content, setContent] = useState(post?.content || "");
  const [publicId, setPublicId] = useState(post?.publicId || "");
  const [thumbnail, setThumbnail] = useState(post?.thumbnail || "");
  const [categoryTitle, setCategoryTitle] = useState(post?.categoryTitle || "");
  const [categories, setCategories] = useState<TCategory[]>([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        let response = await fetch(`/api/categories`);
        if (response.ok) {
          const responseData = await response.json();
          const { data } = responseData;
          if (!data || !Array.isArray(data)) {
            throw new Error("Invalid data format");
          }
          return setCategories(data || []);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();
  }, []);
  const [links, setLinks] = useState<string[]>(post?.links || []);
  const [linkInput, setLinkInput] = useState("");
  const handleLinks: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    const trimedLink = linkInput.trim();
    if (trimedLink !== "") {
      setLinks((prev) => [...prev, trimedLink]);
      setLinkInput("");
    }
    return;
  };
  const deleteLink = (index: number) => {
    setLinks((prev) => prev?.filter((_, idx) => idx !== index));
  };
  const handleImageUplaod = (result: CloudinaryUploadWidgetResults) => {
    const info:string | CloudinaryUploadWidgetInfo | undefined = result.info;
    if (info && typeof info === "object" && "secure_url" in info && "public_id" in info) {
      const { secure_url, public_id } = info;
      setThumbnail(secure_url);
      setPublicId(public_id);
    }
  };
  const handleImageRemove = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    setIsRemoveImageTransaction(async () => {
      try {
        const response = await fetch(`/api/images/${publicId}`, {
          method: "DELETE",
        });
        if (response.ok) {
          setThumbnail("");
          setPublicId("");
        } else {
          throw new Error(`Failed to removed image`);
        }
      } catch (error) {
        console.error(error);
        setError(
          error instanceof Error ? error.message : `Failed to remove image`
        );
      }
    });
  };
  const url = useMemo(() => (post ? `/api/posts/${post?.id}` : `/api/posts`), [post]);
  const method = useMemo(() => (post ? "PUT" : "POST"), [post]);
  const requestConfig = useMemo(() => ({
    headers: {
      "Content-Type": `application/json`,
    },
  }), []);
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!title || !content) return setError("Title & Content Are Required");
    const body = JSON.stringify({
      title,
      content,
      links,
      categoryTitle,
      thumbnail,
      publicId,
    });
    setIsSbumittingFormTransaction(async () => {
      try {
        const response = await fetch(url, {
          method,
          ...requestConfig,
          body,
        });
        if (response.ok) {
          router.push(`/dashboard`);
        } else {
          throw new Error(`Failed to create post`);
        }
      } catch (error) {
        console.error(error);
        setError(
          error instanceof Error ? error.message : `Failed to create post`
        );
      }
    });
  };
  return (
    <div>
      <h2>{post ? "Edit" : "Create"} Post</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          value={title}
          onChange={(event) => {setTitle(event.target.value);}}
          type="text"
          placeholder="Title"
        />
        <textarea
          value={content}
          onChange={(event) => {
            setContent(event.target.value);
          }}
          placeholder="Content"
        ></textarea>
        {links && (
          <div className="flex flex-wrap gap-x-2 gap-y-1">
            {links?.map((link, index) => (
              <div className="flex gap-2.5 items-center" key={index}>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.914 6.025a.75.75 0 0 1 1.06 0 3.5 3.5 0 0 1 0 4.95l-2 2a3.5 3.5 0 0 1-5.396-4.402.75.75 0 0 1 1.251.827 2 2 0 0 0 3.085 2.514l2-2a2 2 0 0 0 0-2.828.75.75 0 0 1 0-1.06Z"
                      clipRule="evenodd"
                    />
                    <path
                      fillRule="evenodd"
                      d="M7.086 9.975a.75.75 0 0 1-1.06 0 3.5 3.5 0 0 1 0-4.95l2-2a3.5 3.5 0 0 1 5.396 4.402.75.75 0 0 1-1.251-.827 2 2 0 0 0-3.085-2.514l-2 2a2 2 0 0 0 0 2.828.75.75 0 0 1 0 1.06Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <Link className="link" href={link}>
                  {link}
                </Link>
                <span
                  onClick={() => {
                    deleteLink(index);
                  }}
                  className="text-red-600 cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 3.25V4H2.75a.75.75 0 0 0 0 1.5h.3l.815 8.15A1.5 1.5 0 0 0 5.357 15h5.285a1.5 1.5 0 0 0 1.493-1.35l.815-8.15h.3a.75.75 0 0 0 0-1.5H11v-.75A2.25 2.25 0 0 0 8.75 1h-1.5A2.25 2.25 0 0 0 5 3.25Zm2.25-.75a.75.75 0 0 0-.75.75V4h3v-.75a.75.75 0 0 0-.75-.75h-1.5ZM6.05 6a.75.75 0 0 1 .787.713l.275 5.5a.75.75 0 0 1-1.498.075l-.275-5.5A.75.75 0 0 1 6.05 6Zm3.9 0a.75.75 0 0 1 .712.787l-.275 5.5a.75.75 0 0 1-1.498-.075l.275-5.5a.75.75 0 0 1 .786-.711Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </div>
            ))}
          </div>
        )}
        <div className="flex gap-2">
          <input
            className="flex-1"
            type="text"
            placeholder="Paste the link and click on Add"
            value={linkInput}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setLinkInput(event.target.value);
            }}
          />
          <button
            type="button"
            className="btn flex gap-2 items-center"
            onClick={handleLinks}
          >
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
              </svg>
            </span>
            Add
          </button>
        </div>
        <CldUploadButton
          onSuccess={handleImageUplaod}
          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
          className={`
          h-48  relative border-slate-300 border border-dotted overflow-hidden bg-slate-100 rounded-md outline-none grid place-items-center
          ${thumbnail && "pointer-events-none"}
          `}
        >
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
          </div>
          {thumbnail && (
            <Image
              src={thumbnail}
              fill
              alt={title}
              className="absolute object-cover inset-0"
            />
          )}
        </CldUploadButton>
        {publicId && (
          <button
            onClick={handleImageRemove}
            disabled={isRemovingImage}
            type="button"
            className="px-4 py-2 w-fit rounded-md font-semibold transition duration-500 outline-none bg-red-500 text-white hover:bg-red-600 text-xs"
          >
            {isRemovingImage ? "Please Wait" : "Remove Image"}
          </button>
        )}
        <select
          onChange={(event) => {
            setCategoryTitle(event.target.value);
          }}
          value={categoryTitle}
          className="appearance-none"
        >
          <option value="">Select A Category</option>
          {categories &&
            categories.length > 0 &&
            categories?.map((category) => (
              <option key={category?.id} value={category?.title}>
                {category?.title}
              </option>
            ))}
        </select>
        <button className="primary-btn" disabled={isSubmittingForm} type="submit">
        { isSubmittingForm ? `Please Wait` : `${post ? "Update" : "Create"} Post`}
        </button>
        {error && (
          <div className="text-red-600 font-bold text-sm p-1">{error}</div>
        )}
      </form>
    </div>
  );
}
