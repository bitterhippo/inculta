export type SelectableImageContainerProps = {
  imgProps?: React.ComponentProps<"img">;
  onClick: () => void;
  isSelected: boolean;
};
