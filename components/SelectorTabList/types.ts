import type { SelectTabProps } from "./SelectorTab/types";

export type SelectTabListProps = {
  tabListData: SelectTabProps[];
  selectorHandler: (label: string) => void;
};
