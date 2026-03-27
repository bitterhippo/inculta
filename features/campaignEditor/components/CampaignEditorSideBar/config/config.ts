import type { SelectTabProps } from "@/components/SelectorTabList/SelectorTab/types";

type CampaignEditorSideBarTabListSubset = Pick<
  SelectTabProps,
  "iconName" | "label"
>;
export const CampaignEditorSideBarTabListOptions: CampaignEditorSideBarTabListSubset[] =
  [
    { iconName: "grid", label: "Assets" },
    { iconName: "layers", label: "Layers" },
  ];
