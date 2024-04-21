import Category from "./Category";
import { TCategory } from "@/types";

async function getCategories(): Promise<TCategory[] | undefined> {
  try {
    let response = await fetch(`${process.env.NEXTAUTH_URL}/api/categories`);
    if (response.ok) {
      const responseData = await response.json();
      const { data } = responseData;
      if (!data || !Array.isArray(data)) {
        throw new Error("Invalid data format");
      }
      return data;
    }
  } catch (error) {
    console.error(error);
  }
}

export default async function CategoriesList() {
  const categories = (await getCategories()) || [];
  return (
    <div className="flex gap-2 flex-wrap">
      {categories &&
        categories?.map((category) => (
          <Category key={category?.id} title={category?.title} />
        ))}
    </div>
  );
}
