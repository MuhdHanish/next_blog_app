import Category from "./Category";
import { categoriesList } from "@/data";

export default function CategoriesList() {
  return (
    <div className="flex gap-2 flex-wrap">
      {categoriesList &&
        categoriesList?.map((category) => (
          <Category key={category?.id} category={category?.name} />
        ))}
    </div>
  );
}
