import { categoryList } from "@/data";
import Link from "next/link";

export default function CategoriesList() {
  return (
    <div className="flex gap-2 text-sm flex-wrap">
      {categoryList &&
        categoryList?.map((category) => (
          <Link className="px-4 py-1 rounded-md bg-slate-800 text-white cursor-pointer" key={category.id} href={`/categories/${category.name}`}>
            {category.name}
          </Link>
        ))}
    </div>
  );
}
