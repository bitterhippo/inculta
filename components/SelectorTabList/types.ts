import type { SelectTabProps } from "./SelectorTab/types";
import { Dispatch, SetStateAction } from "react";

export type SelectTabListProps = {
  tabListData: SelectTabProps[];
  selectorHandler: Dispatch<SetStateAction<string>>;
  selectedTab: string;
};
