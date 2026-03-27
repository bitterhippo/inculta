import { SelectorTab } from "./SelectorTab/SelectorTab";
import { SelectTabListProps } from "./types";

export const SelectTabList = ({ tabListData }: SelectTabListProps) => {
  return (
    <div>
      {tabListData.map(({ label, iconName, isSelected }) => {
        return (
          <SelectorTab
            label={label}
            key={`selectorTab-${label}`}
            isSelected={isSelected}
            iconName={iconName}
          />
        );
      })}
    </div>
  );
};
