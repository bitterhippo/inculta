export type SelectTabProps = {
  label: string;
  iconName: "grid" | "layers" | "menu";
  isSelected?: boolean;
  onClick: (label: string) => void;
};
