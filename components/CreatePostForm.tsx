"use client";
import Link from "next/link";
import { TCategory } from "@/types";
import { useRouter } from "next/navigation";
import { ChangeEvent, MouseEventHandler, useEffect, useState } from "react";

export default function CreatePostForm() {
  const router = useRouter();

  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [publicId, setPublicId] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [categoryTitle, setCategoryTitle] = useState("");
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

  const [links, setLinks] = useState<string[]>([]);
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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!title || !content) return setError("Title & Content Are Required");
    try {
      const response = await fetch(`/api/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          links,
          categoryTitle,
          thumbnail,
          publicId
        }),
      });
      if (response.ok) {
        router.push(`/dashboard`)
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <h2>Create Post</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
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
        <select
          onChange={(event) => {
            setCategoryTitle(event.target.value);
          }}
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
        <button className="primary-btn" type="submit">
          Create Post
        </button>
        {error && (
          <div className="text-red-600 font-bold text-sm p-1">{error}</div>
        )}
      </form>
    </div>
  );
}
