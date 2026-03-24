export interface LongButtonProps {
  checkbox?: { isChecked: boolean };
  onClick: () => void;
  label: string;
  previewContainerContent?: string;
}
