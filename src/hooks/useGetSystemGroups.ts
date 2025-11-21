import type { System, SystemGroup } from "../components/organisms/SystemsGrid";
import sampleData from "../data/resources/sample_data.json";

export type Layout = "systemType" | "dataUse";

const NO_USE_CASE_ID = "no_use_case";

function getSystemsByUseCase(
  dataUse: string[] | null,
  dataCategories: string[] | null
): SystemGroup[] {
  const systemGroupMap = new Map<string, SystemGroup>();

  sampleData.forEach(
    ({ description, fides_key, name, privacy_declarations }) => {
      if (privacy_declarations.length === 0) {
        const systemGroup: SystemGroup = systemGroupMap.get(NO_USE_CASE_ID) || {
          id: NO_USE_CASE_ID,
          name: "No Data Use",
          systems: [],
        };

        const systemsSet = new Set(systemGroup.systems.map(({ id }) => id));

        if (!systemsSet.has(fides_key)) {
          systemsSet.add(fides_key);
          systemGroup.systems.push({
            id: fides_key,
            categories: [],
            description,
            name,
          });
        }

        systemGroupMap.set(NO_USE_CASE_ID, systemGroup);
      }
      privacy_declarations.forEach(
        ({ data_use, name: privacy_name, data_categories }) => {
          const systemGroup: SystemGroup = systemGroupMap.get(data_use) || {
            id: data_use,
            name: privacy_name,
            systems: [],
          };

          const systemMap = new Map<string, System>();
          systemGroup.systems.forEach((system) => {
            systemMap.set(system.id, system);
          });

          const system = systemMap.get(fides_key) || {
            id: fides_key,
            categories: [],
            description,
            name,
          };

          if (!systemMap.has(fides_key)) {
            systemGroup.systems.push(system);
          }

          const categoriesSet = new Set<string>(
            system.categories.map(({ id }) => id)
          );

          data_categories.forEach((category) => {
            if (!categoriesSet.has(category)) {
              categoriesSet.add(category);
              system.categories.push({
                id: category,
                name: category.split(".").pop() || "",
              });
            }
          });

          systemGroupMap.set(data_use, systemGroup);
        }
      );
    }
  );

  return Array.from(systemGroupMap.values())
    .filter(({ id }) => {
      return dataUse === null || dataUse.includes(id);
    })
    .map(({ id, name, systems }) => {
      return {
        id,
        name,
        systems: systems.filter(({ categories }) => {
          return (
            dataCategories === null ||
            categories.some(({ id }) => dataCategories.includes(id))
          );
        }),
      };
    })
    .filter(({ systems }) => {
      return systems.length > 0;
    });
}

function getSystemsBySystemType(
  dataUse: string[] | null,
  dataCategories: string[] | null
): SystemGroup[] {
  const systemGroupMap = new Map<string, SystemGroup>();
  const systemDataUseMap = new Map<string, Set<string>>();

  sampleData.forEach(
    ({ description, fides_key, name, privacy_declarations, system_type }) => {
      const systemGroup: SystemGroup = systemGroupMap.get(system_type) || {
        id: system_type,
        name: system_type,
        systems: [],
      };

      const systemMap = new Map<string, System>();
      systemGroup.systems.forEach((system) => {
        systemMap.set(system.id, system);
      });

      const system = systemMap.get(fides_key) || {
        id: fides_key,
        categories: [],
        description,
        name,
      };

      if (!systemMap.has(fides_key)) {
        systemGroup.systems.push(system);
      }

      const categoriesSet = new Set<string>(
        system.categories.map(({ id }) => id)
      );

      privacy_declarations.forEach(({ data_categories }) => {
        data_categories.forEach((category) => {
          if (!categoriesSet.has(category)) {
            categoriesSet.add(category);
            system.categories.push({
              id: category,
              name: category.split(".").pop() || "",
            });
          }
        });
      });

      privacy_declarations.forEach(({ data_use }) => {
        const systemDataUse =
          systemDataUseMap.get(fides_key) || new Set<string>();
        systemDataUse.add(data_use);
        systemDataUseMap.set(fides_key, systemDataUse);
      });

      systemGroupMap.set(system_type, systemGroup);
    }
  );

  return Array.from(systemGroupMap.values())
    .map(({ id, name, systems }) => {
      return {
        id,
        name,
        systems: systems
          .filter(({ categories }) => {
            return (
              dataCategories === null ||
              categories.some(({ id }) => dataCategories.includes(id))
            );
          })
          .filter(({ id }) => {
            if (dataUse === null) {
              return true;
            }
            const dataUseSet = systemDataUseMap.get(id) || new Set<string>();
            return dataUse.some((dataUse) => dataUseSet.has(dataUse));
          }),
      };
    })
    .filter(({ systems }) => {
      return systems.length > 0;
    });
}

export const useGetSystemGroups = ({
  layout,
  dataUse,
  dataCategories,
}: {
  layout: Layout;
  dataUse: string[] | null;
  dataCategories: string[] | null;
}): SystemGroup[] => {
  return layout === "systemType"
    ? getSystemsBySystemType(dataUse, dataCategories)
    : getSystemsByUseCase(dataUse, dataCategories);
};
