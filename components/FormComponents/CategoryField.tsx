import { request } from "@/utils/fetch";
import { TCategory, TRequestProps } from "@/types";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

type TCategoryFieldProps = {
  setCategoryTitle: (value: string) => void;
  categoryTitle: string, 
}

export const CategoryField = ({ setCategoryTitle, categoryTitle }: TCategoryFieldProps) => {
  
  const [categories, setCategories] = useState<TCategory[]>([]);
  const setError = useCallback((error: string) => toast.error(error), []);

  const fetchCategories = useCallback(async () => {
    const options: TRequestProps = {
      url: `/categories`,
      isClient: true,
      returnType: "array",
      method:"GET",
      setError,
    };
    const categories = (await request(options)) as TCategory[] | undefined;
    setCategories(categories || []);
  }, [setError]);
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);
  return (
    <select
      onChange={(event) => {
        setCategoryTitle(event.target.value);
      }}
      value={categoryTitle}
      className="appearance-none"
    >
      <option value="">Select A Category</option>
      {categories &&
        categories?.length > 0 &&
        categories?.map((category) => (
          <option key={category?.id} value={category?.title}>
            {category?.title}
          </option>
        ))}
    </select>
  );
}
