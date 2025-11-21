import { Button } from "../atoms/Button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../particles/Collapsible";
import { ChevronsUpDown } from "lucide-react";

export type SystemCategory = {
  id: string;
  name: string;
};

export type System = {
  id: string;
  name: string;
  description: string;
  categories: SystemCategory[];
};

export type SystemGroup = {
  id: string;
  name: string;
  systems: System[];
};

const SystemCard = ({ categories, description, name }: System) => {
  return (
    <div className="border border-gray-200 rounded-lg w-64 relative group">
      <h1 className="px-2 py-1 bg-blue-800 text-white text-center rounded-t-lg">
        {name}
      </h1>
      <div className="relative">
        <Collapsible>
          <CollapsibleTrigger className="absolute -mt-6 -right-4">
            <Button
              size={"icon-sm"}
              variant={"outline"}
              className="rounded-full"
            >
              <ChevronsUpDown />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="px-2 py-1">{description}</div>
          </CollapsibleContent>
        </Collapsible>
        <div className="overflow-hidden rounded-lg">
          {categories.length > 0 ? (
            categories.map(({ id, name }) => {
              return (
                <div
                  key={id}
                  className="px-2 py-1 w-full odd:bg-gray-100 even:bg-gray-200"
                >
                  {name}
                </div>
              );
            })
          ) : (
            <div className="px-2 py-1 w-full odd:bg-gray-100 text-center">
              No Data Categories Provided
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const SystemCardGroupColumn = ({ name, systems }: SystemGroup) => {
  return (
    <div className="flex flex-col flex-nowrap gap-4">
      <h1 className="text-3xl text-center">{name}</h1>
      {systems.map(({ categories, description, id, name }) => {
        return (
          <SystemCard
            key={id}
            categories={categories}
            description={description}
            name={name}
            id={id}
          />
        );
      })}
    </div>
  );
};

export const SystemsGrid = ({
  systemGroups,
}: {
  systemGroups: SystemGroup[];
}) => {
  return (
    <div className="w-full flex justify-center">
      <div className=" flex flex-row flex-wrap gap-4 justify-start">
        {systemGroups.map(({ id, name, systems }) => (
          <SystemCardGroupColumn
            key={id}
            id={id}
            name={name}
            systems={systems}
          />
        ))}
      </div>
    </div>
  );
};
