import { SelectorTab } from "./SelectorTab/SelectorTab";
import { SelectTabListProps } from "./types";
import styles from "./styles.module.css";

export const SelectTabList = ({ tabListData }: SelectTabListProps) => {
  return (
    <div className={styles.SelectTabListContainer}>
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
