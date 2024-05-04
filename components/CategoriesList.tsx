import Category from "./Category";
import { request } from "@/utils";
import { TCategory, TRequestProps } from "@/types";

export default async function CategoriesList() {
  const options: TRequestProps = {
    url: `/categories`,
    returnType: "array",
    method: "GET"
  };
  const categories = (await request(options)) as TCategory[] | undefined;
  return (
    <div className="flex gap-2 flex-wrap">
      {categories &&
        categories?.map((category) => (
          <Category key={category?.id} title={category?.title} />
        ))}
    </div>
  );
}
