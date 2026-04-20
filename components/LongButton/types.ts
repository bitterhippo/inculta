export interface LongButtonProps {
  onClick: () => void;
  label: string;
  iconName?: "save" | "arrowLeftCircle";
  isDisabled?: boolean;
}
