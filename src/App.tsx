import { useState } from "react";

import { SystemsGrid } from "./components/organisms/SystemsGrid";
import { useGetSystemGroups, type Layout } from "./hooks/useGetSystemGroups";
import { Tabs, TabsList, TabsTrigger } from "./components/molecules/Tabs";
import { useGetDataUseOptions } from "./hooks/useGetDataUseOptions";
import { useGetDataCategoriesOptions } from "./hooks/useGetDataCategoriesOptions";
import { SystemsFilter } from "./components/organisms/SystemsFilter";

function App() {
  const [layout, setLayout] = useState<Layout>("systemType");
  const [dataUse, setDataUse] = useState<string[] | null>(null);
  const [dataCategories, setDataCategories] = useState<string[] | null>(null);
  const dataUseOptions = useGetDataUseOptions();
  const dataCategoriesOptions = useGetDataCategoriesOptions();
  const systemGroups = useGetSystemGroups({ layout, dataUse, dataCategories });

  return (
    <div className="flex flex-col h-screen">
      <div className="p-4 bg-blue-100">
        <Tabs value={layout} onValueChange={(e) => setLayout(e as Layout)}>
          <TabsList>
            <TabsTrigger value="systemType">System Type</TabsTrigger>
            <TabsTrigger value="dataUse">Data Use</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className="flex-1 flex flex-row flex-nowrap">
        <div className="flex-1 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full overflow-scroll p-4">
            <SystemsGrid systemGroups={systemGroups} />
          </div>
        </div>
        <div>
          <SystemsFilter
            dataUseOptions={dataUseOptions}
            dataCategoriesOptions={dataCategoriesOptions}
            dataUse={dataUse}
            dataCategories={dataCategories}
            onDataUseChange={setDataUse}
            onDataCategoriesChange={setDataCategories}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
