import Image from "next/image";
import { useTransition } from "react";
import { TImageHandlerProps } from "@/types";
import { CldUploadButton, CloudinaryUploadWidgetInfo, CloudinaryUploadWidgetResults } from "next-cloudinary";

export const Cloudinary = ({
  setThumbnail,
  thumbnail,
  setPublicId,
  publicId,
  setError,
  alt
}: TImageHandlerProps) => {
  const [isPending, startTransaction] = useTransition();
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
    startTransaction(async () => {
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
        setError && setError(error instanceof Error ? error.message : `Failed to remove image`);
      }
    });
  };
  return (
    <>
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
            alt={alt}
            className="absolute object-cover inset-0"
          />
        )}
      </CldUploadButton>
      {publicId && (
        <button
          onClick={handleImageRemove}
          disabled={isPending}
          type="button"
          className="px-4 py-2 w-fit rounded-md font-semibold transition duration-500 outline-none bg-red-500 text-white hover:bg-red-600 text-xs"
        >
          {isPending ? "Please Wait" : "Remove Image"}
        </button>
      )}
    </>
  );
}