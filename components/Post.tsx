import Image from "next/image";
import Link from "next/link";
import DeleteButton from "./DeleteButton";

type TPostProps = {
  id: string;
  author: string;
  authorEmail?: string;
  title: string;
  content: string;
  category?: string;
  datePublished: string;
  links?: string[];
  thumbnail?: string;
};

export default function Post({ postData }: { postData: TPostProps }) {
  const isEditable = true;
  return (
    <div className="my-4 border-b border-b-300 py-8">
      <div className="mb-4">
        Posted by: <span className="font-bold">{postData?.author}</span> on{" "}
        {postData?.datePublished}
      </div>
      <div className="w-full h-72 relative">
        <Image
          className="object-cover rounded-md object-center"
          src={postData?.thumbnail || "/thumbnail-placeholder.png"}
          alt={postData?.title}
          fill
        />
      </div>
      {postData?.category && (
        <Link
          className="px-4 py-0.5 w-fit rounded-md bg-slate-800 text-white font-bold cursor-pointer text-sm mt-4 block"
          href={`/categories/${postData?.category}`}
        >
          {postData?.category}
        </Link>
      )}
      <h2>{postData?.title}</h2>
      <p className="content">{postData?.content}</p>
      {postData?.links && (
        <div className="my-4 flex flex-col gap-3">
          {postData?.links?.map((link, index) => (
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
                href={`/edit-post/${postData?.id}`}
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
