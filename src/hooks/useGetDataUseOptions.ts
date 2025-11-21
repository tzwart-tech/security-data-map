import type { DataUseOption } from "../components/organisms/SystemsFilter";
import sampleData from "../data/resources/sample_data.json";

export const useGetDataUseOptions = (): DataUseOption[] => {
  const dataUseOptionsMap = new Map<string, DataUseOption>();

  sampleData.forEach(({ privacy_declarations }) => {
    privacy_declarations.forEach(({ data_use, name }) => {
      if (!dataUseOptionsMap.has(data_use)) {
        dataUseOptionsMap.set(data_use, { name, id: data_use });
      }
    });
  });

  return Array.from(dataUseOptionsMap.values());
};
