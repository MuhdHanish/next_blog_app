import Category from "./Category";
import { categoryList } from "@/data";

export default function CategoriesList() {
  return (
    <div className="flex gap-2 flex-wrap">
      {categoryList &&
        categoryList?.map((category) => (
          <Category key={category?.id} category={category?.name} />
        ))}
    </div>
  );
}
