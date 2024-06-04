import Link from "next/link";
import Image from "next/image";
import { TPost } from "@/types";
import Category from "./Category";
import DeleteButton from "./DeleteButton";
import { getServerSession } from "next-auth/next";
import authOptions from "@/app/api/auth/[...nextauth]/options";

type TPostProps = {
  post: TPost;
};

export default async function Post({ post }: TPostProps) {
  const session = await getServerSession(authOptions);
  const isEditable = session && session?.user?.email === post?.authorEmail;
  const dateObject = new Date(post?.createdAt);
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };
  const createdAt = dateObject.toLocaleDateString("en-US", options);
  return (
    <div className="my-4 border-b border-b-300 py-8">
      {<div className="mb-4">
        Posted{" "}
        {!isEditable && <>{"by : "} <span className="font-bold">{post?.author?.name}</span> </>}
        on{" "}
        {createdAt}
      </div>}
      <div className="w-full h-72 relative">
        <Image
          className="object-cover rounded-md object-center"
          src={post?.thumbnail || "/thumbnail-placeholder.png"}
          alt={post?.title}
          fill
        />
      </div>
      {post?.categoryTitle && (
        <div className="mt-4 flex">
          <Category title={post?.categoryTitle} />
        </div>
      )}
      <h2>{post?.title}</h2>
      <p className="content">{post?.content}</p>
      {post?.links && (
        <div className="my-4 flex flex-col gap-1.5">
          {post?.links?.map((link, index) => (
            <div key={index} className="flex gap-1.5 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-6 md:w-4 h-6 md:h-4"
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
              <Link href={link} className="link">
                {link}
              </Link>
            </div>
          ))}
          {isEditable && (
            <div className="flex gap-2 w-fit py-2 px-4 ">
              <Link
                href={`/edit-post/${post?.id}`}
                className="text-emerald-500 editable-btns"
              >
                EDIT
              </Link>
              <DeleteButton post={post}/>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
