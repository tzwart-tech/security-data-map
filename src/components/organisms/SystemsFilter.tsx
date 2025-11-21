import { Button } from "../atoms/Button";

export type DataUseOption = {
  name: string;
  id: string;
};

export type DataCategoryOption = {
  name: string;
  id: string;
};

export type SystemsFilterProps = {
  dataCategoriesOptions: DataCategoryOption[];
  dataUseOptions: DataUseOption[];
  dataUse: string[] | null;
  dataCategories: string[] | null;
  onDataUseChange: (v: string[] | null) => void;
  onDataCategoriesChange: (v: string[] | null) => void;
};

export const SystemsFilter = ({
  dataCategories,
  dataCategoriesOptions,
  dataUse,
  dataUseOptions,
  onDataCategoriesChange,
  onDataUseChange,
}: SystemsFilterProps) => {
  const handleDataUseChange = (id: string) => {
    let newDataUse: string[] | null = dataUse;
    if (dataUse === null) {
      newDataUse = [id];
    } else {
      newDataUse = dataUse.includes(id)
        ? dataUse.filter((i) => i !== id)
        : [...dataUse, id];
    }

    onDataUseChange(
      newDataUse !== null && newDataUse.length > 0 ? newDataUse : null
    );
  };

  const handleDataCategoriesChange = (id: string) => {
    let newDataCategories: string[] | null = dataCategories;
    if (dataCategories === null) {
      newDataCategories = [id];
    } else {
      newDataCategories = dataCategories.includes(id)
        ? dataCategories.filter((i) => i !== id)
        : [...dataCategories, id];
    }
    onDataCategoriesChange(
      newDataCategories !== null && newDataCategories.length > 0
        ? newDataCategories
        : null
    );
  };

  return (
    <div className="px-4">
      <div className="flex flex-col flex-nowrap gap-2">
        <div>Data Use</div>
        <div className="flex flex-col flex-nowrap gap-2">
          {dataUseOptions.map((option) => (
            <Button
              key={option.id}
              variant={
                dataUse === null || dataUse.includes(option.id)
                  ? "default"
                  : "outline"
              }
              onClick={() => handleDataUseChange(option.id)}
            >
              {option.name}
            </Button>
          ))}
        </div>

        <div>Data Categories</div>
        <div className="flex flex-col flex-nowrap gap-2">
          {dataCategoriesOptions.map((option) => (
            <Button
              key={option.id}
              variant={
                dataCategories === null || dataCategories.includes(option.id)
                  ? "default"
                  : "outline"
              }
              onClick={() => handleDataCategoriesChange(option.id)}
            >
              {option.name}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
