import Link from "next/link";
import Image from "next/image";
import { TPost } from "@/types/TPost";
import DeleteButton from "./DeleteButton";
import Category from "./Category";

type TPostProps = {
  post: TPost
}

export default function Post({ post }: TPostProps) {
  const isEditable = true;
  return (
    <div className="my-4 border-b border-b-300 py-8">
      <div className="mb-4">
        Posted by: <span className="font-bold">{post?.author}</span> on
        {post?.datePublished}
      </div>
      <div className="w-full h-72 relative">
        <Image
          className="object-cover rounded-md object-center"
          src={post?.thumbnail || "/thumbnail-placeholder.png"}
          alt={post?.title}
          fill
        />
      </div>
      {post?.category && (
        <div className="mt-4 flex">
          <Category category={post?.category} />
        </div>
      )}
      <h2>{post?.title}</h2>
      <p className="content">{post?.content}</p>
      {post?.links && (
        <div className="my-4 flex flex-col gap-3">
          {post?.links?.map((link, index) => (
            <div key={index} className="flex gap-2 items-center">
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
                  d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
                />
              </svg>
              <Link href={link} className="link">
                {link}
              </Link>
            </div>
          ))}
          {isEditable && (
            <div className="flex gap-3 w-fit py-2 px-4 ">
              <Link
                href={`/edit-post/${post?.id}`}
                className="text-emerald-500 editable-btns"
              >
                Edit
              </Link>
              <DeleteButton />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
