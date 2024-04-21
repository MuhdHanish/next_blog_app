import Link from "next/link";

export default function Category({ title }: { title: string }) {
  return (
    <Link
      className="px-4 py-1 rounded-md text-sm bg-slate-800 text-white cursor-pointer"
      href={`/category/${title}`}
    >
      {title}
    </Link>
  );
}