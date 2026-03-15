import styles from "./styles.module.css";
import type { ExpandableContainerSelectButtonProps } from "./types";

export const ExpandableContainerSelectButton = ({
  onClick,
  label,
  isChecked,
  previewContainerContent,
}: ExpandableContainerSelectButtonProps) => {
  return (
    <div onClick={onClick} className={styles.ExpandableContainerSelectButton}>
      <div>
        <input type="checkbox" checked={isChecked}></input>
      </div>
      <div>{label}</div>
      <div className={styles.PreviewContainer}>{previewContainerContent}</div>
    </div>
  );
};
