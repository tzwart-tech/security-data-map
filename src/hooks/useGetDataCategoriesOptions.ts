import type { DataCategoryOption } from "../components/organisms/SystemsFilter";
import sampleData from "../data/resources/sample_data.json";

export const useGetDataCategoriesOptions = (): DataCategoryOption[] => {
  const dataCategoriesOptionsMap = new Map<string, DataCategoryOption>();

  sampleData.forEach(({ privacy_declarations }) => {
    privacy_declarations.forEach(({ data_categories }) => {
      data_categories.forEach((category) => {
        if (!dataCategoriesOptionsMap.has(category)) {
          dataCategoriesOptionsMap.set(category, {
            name: category.split(".").pop() || "",
            id: category,
          });
        }
      });
    });
  });

  return Array.from(dataCategoriesOptionsMap.values());
};
