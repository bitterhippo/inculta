import { SelectorTab } from "./SelectorTab/SelectorTab";
import { SelectTabListProps } from "./types";

export const SelectTabList = ({ tabListData }: SelectTabListProps) => {
  return (
    <div>
      {tabListData.map(({ label, iconName }) => {
        return <SelectorTab label={label} iconName={iconName} />;
      })}
    </div>
  );
};
