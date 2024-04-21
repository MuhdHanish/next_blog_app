export const dynamic = "force-dynamic";

import Category from "./Category";
import { TCategory } from "@/types";

async function findCategories(): Promise<TCategory[] | undefined> {
  try {
    let response = await fetch(`${process.env.NEXTAUTH_URL}/api/categories`, { cache: "no-store" });
    if (response.ok) {
      const responseData = await response.json();
      const { data } = responseData;
      if (!data || !Array.isArray(data)) {
          throw new Error(`Invalid data format\nReceived: ${JSON.stringify(data, null, 2)}`);
      }
      return data;
    } else {
      throw new Error(`Request failed, HTTP Status Code : ${response.status}`);
    }
  } catch (error) {
    console.error(error);
  }
}

export default async function CategoriesList() {
  const categories = (await findCategories()) || [];
  return (
    <div className="flex gap-2 flex-wrap">
      {categories &&
        categories?.map((category) => (
          <Category key={category?.id} title={category?.title} />
        ))}
    </div>
  );
}
