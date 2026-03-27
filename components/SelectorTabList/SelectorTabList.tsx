import { SelectorTab } from "./SelectorTab/SelectorTab";
import { SelectTabListProps } from "./types";
import styles from "./styles.module.css";

export const SelectTabList = ({
  tabListData,
  selectorHandler,
  selectedTab,
}: SelectTabListProps) => {
  return (
    <div className={styles.SelectTabListContainer}>
      {tabListData.map(({ label, iconName }) => {
        return (
          <SelectorTab
            label={label}
            key={`selectorTab-${label}`}
            isSelected={selectedTab === label}
            iconName={iconName}
            onClick={() => selectorHandler(label)}
          />
        );
      })}
    </div>
  );
};
